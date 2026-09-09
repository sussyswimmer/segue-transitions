// Segue — content script.
// Tracks the editable field the user is writing in, hands its context to the side
// panel, pops suggestions up at the caret the moment a sentence is finished, and
// inserts the chosen transition back at the caret.
//
// Runs in every frame. A frame stays silent unless it is the one holding the caret
// (or, on Google Docs, the top frame), so the panel gets one answer per tab.

(() => {
  const VERSION = '1.1.2';

  // Re-injection guard. Keyed on the version, not a bare flag: after the extension is
  // reloaded, the old script in an open tab is dead but its flag survives, and a plain
  // boolean would block the new build from taking over the page.
  if (window.__segueVersion === VERSION) return;
  window.__segueVersion = VERSION;

  // Docs runs its hidden keyboard target in its own iframe, and our script lands there
  // too. That frame must not answer as a text field — the top frame speaks for Docs —
  // or it races the real answer and the panel shows an empty box.
  try {
    if (window.frameElement && window.frameElement.classList.contains('docs-texteventtarget-iframe')) {
      return;
    }
  } catch {
    // Cross-origin frameElement access throws; such a frame is not the Docs target.
  }

  // A marker in the shared DOM, so "is the current build actually live?" is answerable
  // from the page without guessing.
  try {
    document.documentElement.setAttribute('data-segue', VERSION);
  } catch {}

  const BEFORE_CHARS = 900;
  const AFTER_CHARS = 120;
  const IDLE_MS = 700;
  const POPUP_DELAY_MS = 350; // let the space after the period land first
  const MIN_SENTENCE = 30; // characters, below which a full stop is not worth reacting to

  const isDocs = location.hostname === 'docs.google.com';
  const isTopFrame = window.top === window;

  /** @type {HTMLElement|null} */
  let target = null;
  /** @type {Range|null} Live range — the DOM keeps it in sync as the page changes. */
  let savedRange = null;
  let idleTimer = 0;
  let popupTimer = 0;
  let lastTrigger = ''; // so one full stop fires once, not on every keystroke after it

  // `online` is the master switch for sending text to DeepSeek; with it off the
  // popup never fires, rather than firing and reporting that it has no key.
  const prefs = { autoPopup: true, online: true, theme: 'light' };
  chrome.storage.local
    .get(['autoPopup', 'online', 'theme'])
    .then((stored) => {
      prefs.autoPopup = stored.autoPopup !== false;
      prefs.online = stored.online !== false;
      prefs.theme = stored.theme || 'light';
    })
    .catch(() => {});
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.autoPopup) prefs.autoPopup = changes.autoPopup.newValue !== false;
    if (changes.online) prefs.online = changes.online.newValue !== false;
    if (changes.theme) prefs.theme = changes.theme.newValue || 'light';
  });

  // ------------------------------------------------------------ liveness

  let retired = false;

  /**
   * After the extension is reloaded, scripts already running in open tabs lose their
   * connection — every chrome.* call then throws "Extension context invalidated".
   * chrome.runtime.id going undefined is the signal, so we check before reaching out.
   */
  function alive() {
    if (retired) return false;
    try {
      return Boolean(chrome.runtime && chrome.runtime.id);
    } catch {
      return false;
    }
  }

  /** Stand down quietly; the freshly injected copy of the script takes over. */
  function retire() {
    retired = true;
    clearTimeout(idleTimer);
    clearTimeout(popupTimer);
    closePopup();
  }

  // ---------------------------------------------------------------- detection

  function isEditable(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.isContentEditable) return true;
    const tag = el.tagName;
    if (tag === 'TEXTAREA') return !el.disabled && !el.readOnly;
    if (tag === 'INPUT') {
      const type = (el.type || 'text').toLowerCase();
      const typed = ['text', 'search', 'url', 'email', 'tel', ''].includes(type);
      return typed && !el.disabled && !el.readOnly;
    }
    return false;
  }

  function remember(el) {
    if (!isEditable(el)) return;
    if (el !== target) closePopup();
    target = el;
    if (el.isContentEditable) {
      const sel = window.getSelection();
      if (sel && sel.rangeCount && el.contains(sel.anchorNode)) {
        savedRange = sel.getRangeAt(0).cloneRange();
      }
    }
    scheduleUpdate();
  }

  // ------------------------------------------------------------ text around caret

  /** Split a contenteditable root into the text before and after the caret. */
  function editableSlices(root, range) {
    const whole = root.innerText ?? root.textContent ?? '';
    if (!range) return { before: whole, after: '' };
    const r = document.createRange();
    r.selectNodeContents(root);
    r.setEnd(range.startContainer, range.startOffset);
    const before = r.toString();
    return { before, after: whole.slice(before.length) };
  }

  function readContext() {
    if (!target || !target.isConnected) {
      // Google Docs paints the document to a <canvas>, so there is no caret to read.
      // Report the tab anyway: the panel switches to its typed-context mode.
      if (isDocs && isTopFrame) {
        return {
          kind: 'docs',
          before: docsBuffer, // whatever we have watched you type this session
          after: '',
          atStart: docsBuffer.trim().length === 0,
          field: 'Google Docs',
          url: location.href
        };
      }
      return null;
    }

    let before = '';
    let after = '';

    if (target.isContentEditable) {
      const sel = window.getSelection();
      const live =
        sel && sel.rangeCount && target.contains(sel.anchorNode) ? sel.getRangeAt(0) : savedRange;
      if (live) savedRange = live.cloneRange();
      ({ before, after } = editableSlices(target, savedRange));
    } else {
      const value = target.value ?? '';
      const caret = target.selectionStart ?? value.length;
      before = value.slice(0, caret);
      after = value.slice(target.selectionEnd ?? caret);
    }

    return {
      kind: 'field',
      before: before.slice(-BEFORE_CHARS),
      after: after.slice(0, AFTER_CHARS),
      atStart: before.trim().length === 0,
      field: describeField(target),
      url: location.href
    };
  }

  function describeField(el) {
    const label =
      el.getAttribute('aria-label') ||
      el.getAttribute('placeholder') ||
      (el.labels && el.labels[0] ? el.labels[0].textContent : '') ||
      el.getAttribute('name') ||
      '';
    const kind = el.isContentEditable ? 'rich text' : el.tagName === 'TEXTAREA' ? 'text area' : 'input';
    const trimmed = label.trim().replace(/\s+/g, ' ').slice(0, 40);
    return trimmed ? trimmed + ' · ' + kind : kind;
  }

  // ------------------------------------------------- did they just end a sentence?

  const ABBREVIATIONS = new Set([
    'mr', 'mrs', 'ms', 'dr', 'prof', 'st', 'vs', 'etc', 'eg', 'ie', 'no', 'fig', 'approx',
    'jr', 'sr', 'inc', 'ltd', 'al', 'ca', 'cf', 'ed', 'pp', 'vol'
  ]);

  /**
   * True only for a full stop that really closed a sentence: not a decimal, not a list
   * number, not "e.g.", and with enough words in front of it to reason about.
   */
  function justFinishedSentence(before) {
    const trimmed = before.replace(/\s+$/, '');
    if (!/[.!?][")\]]?$/.test(trimmed)) return false;

    const core = trimmed.replace(/[")\]]$/, '');
    const lastWord = (core.slice(0, -1).match(/[\w.]+$/) || [''])[0];

    if (/\d$/.test(lastWord)) return false; // 3.14, "Step 2."
    if (lastWord.includes('.')) return false; // e.g., U.S., ellipsis
    if (ABBREVIATIONS.has(lastWord.toLowerCase())) return false;

    // Measure the sentence that just closed, not the whole passage.
    const sentence = core.slice(0, -1).split(/[.!?]\s/).pop() || '';
    return sentence.trim().length >= MIN_SENTENCE;
  }

  function maybeAutoSuggest() {
    if (!prefs.autoPopup || !prefs.online || !target) return;
    const ctx = readContext();
    if (!ctx || ctx.kind !== 'field') return;
    offerFor(ctx);
  }

  /** Shared by the ordinary-field path and the Docs keystroke buffer. */
  function offerFor(ctx) {
    if (!justFinishedSentence(ctx.before)) return;

    const signature = ctx.before.replace(/\s+$/, '').slice(-60);
    if (signature === lastTrigger) return; // already offered for this full stop
    lastTrigger = signature;

    clearTimeout(popupTimer);
    popupTimer = setTimeout(() => requestPopup(ctx), POPUP_DELAY_MS);
  }

  // ------------------------------------------------------- reading Google Docs

  // Docs renders to a canvas, so its text is not in the DOM and cannot be read back.
  // What we CAN see is every keystroke, because Docs routes them through a hidden
  // contenteditable. Mirroring those into a rolling buffer gives us the sentence the
  // writer just finished — which is all the suggestion needs.
  let docsBuffer = '';
  let docsWatched = null;

  function watchDocsTyping() {
    if (!isDocs || !isTopFrame) return;

    const attach = () => {
      const box = docsEditable();
      if (!box || box === docsWatched) return;
      docsWatched = box;
      const doc = box.ownerDocument;
      // Capture phase, ahead of Docs, so the popup can claim Enter and Escape.
      doc.addEventListener('keydown', onPopupKey, true);
      doc.addEventListener('keydown', onDocsKey, true);
    };

    attach();
    // The editor is built well after document_idle, and Docs replaces this iframe when
    // you switch document tabs. A slow poll costs nothing; a subtree MutationObserver
    // on Docs would fire on every canvas repaint.
    setInterval(attach, 1500);
  }

  function onDocsKey(event) {
    if (event.ctrlKey || event.metaKey || event.altKey) return;

    if (event.key === 'Backspace') {
      docsBuffer = docsBuffer.slice(0, -1);
      return;
    }
    if (event.key === 'Enter') {
      docsBuffer = '';
      lastTrigger = '';
      return;
    }
    if (event.key.length !== 1) return;

    docsBuffer = (docsBuffer + event.key).slice(-BEFORE_CHARS);
    if (!prefs.autoPopup || !prefs.online) return;
    offerFor({ kind: 'docs', before: docsBuffer, after: '' });
  }

  // -------------------------------------------------------------------- insert

  const OPENERS = /[\s(\[\u201C\u2018\u0022\u0027]$/;
  const CLOSERS = /^[\s.,;:!?)\]]/;

  /** Decide spacing and case so the phrase lands the way a person would type it. */
  function fitToContext(phrase, before, after) {
    const prev = before.replace(/[ \t]+$/, '').slice(-1);
    const startsSentence = prev === '' || '.!?;:'.includes(prev) || /\n\s*$/.test(before);

    let text = phrase;
    if (!startsSentence && /^[A-Z][a-z]/.test(text)) {
      text = text[0].toLowerCase() + text.slice(1); // reads better lowercase mid-sentence
    }

    const needsLeadingSpace = before.length > 0 && !OPENERS.test(before);
    const needsTrailingSpace = after.length === 0 || !CLOSERS.test(after);

    return (needsLeadingSpace ? ' ' : '') + text + (needsTrailingSpace ? ' ' : '');
  }

  /**
   * The hidden contenteditable Docs routes all keyboard and IME input through. Note the
   * editable node is a div inside the iframe, NOT the iframe body.
   */
  function docsEditable() {
    const frame = document.querySelector('.docs-texteventtarget-iframe');
    const doc = frame && frame.contentDocument;
    if (!doc) return null;
    return doc.querySelector('[contenteditable="true"]') || doc.querySelector('[role="textbox"]');
  }

  /**
   * Writing into Google Docs. execCommand('insertText') is rejected outright by current
   * Docs (verified: returns false, caret does not move), so we hand Docs a synthetic
   * paste instead — its paste handler accepts the DataTransfer and applies the text at
   * the cursor. The panel keeps a clipboard fallback behind this for the case where the
   * side panel has taken window focus away from the document.
   */
  /** Where Docs is drawing the caret right now, as a positioning and success signal. */
  function docsCaretTransform() {
    const cursor = document.querySelector('.kix-cursor');
    return cursor ? cursor.style.transform : '';
  }

  async function docsInsert(text) {
    const box = docsEditable();
    if (!box) return false;

    const before = docsCaretTransform();
    try {
      // The side panel steals window focus; ask for it back before writing.
      try { window.focus(); } catch {}
      box.focus();
      const data = new DataTransfer();
      data.setData('text/plain', text);
      box.dispatchEvent(
        new ClipboardEvent('paste', {
          clipboardData: data,
          bubbles: true,
          cancelable: true,
          composed: true
        })
      );
    } catch {
      return false;
    }

    // Docs does not cancel the event (verified), so the return value tells us nothing.
    // It moves its own caret once the text is applied — that is the real confirmation.
    await new Promise((resolve) => setTimeout(resolve, 220));
    return docsCaretTransform() !== before;
  }

  function insert(phrase) {
    if (!target || !target.isConnected) {
      if (isDocs && isTopFrame) {
        // Docs needs a space in front unless we are opening a fresh line.
        const lead = docsBuffer && !/\s$/.test(docsBuffer) ? ' ' : '';
        return docsInsert(lead + phrase + ' ').then((ok) => {
          if (ok) {
            docsBuffer = (docsBuffer + lead + phrase + ' ').slice(-BEFORE_CHARS);
            lastTrigger = docsBuffer.slice(-60);
          }
          return ok ? { ok: true, inserted: phrase } : { ok: false, error: 'docs-canvas' };
        });
      }
      return { ok: false, error: 'field-gone' };
    }

    const ctx = readContext();
    if (!ctx) return { ok: false, error: 'field-gone' };
    const text = fitToContext(phrase, ctx.before, ctx.after);

    target.focus();

    if (target.isContentEditable) {
      const sel = window.getSelection();
      if (savedRange && sel) {
        sel.removeAllRanges();
        sel.addRange(savedRange);
      }
      // execCommand is deprecated but remains the only insertion path that fires the
      // beforeinput/input pair rich editors (ProseMirror, Slate, Quill) listen for.
      const done = document.execCommand('insertText', false, text);
      if (!done) return { ok: false, error: 'insert-refused' };
      const moved = window.getSelection();
      if (moved && moved.rangeCount) savedRange = moved.getRangeAt(0).cloneRange();
    } else {
      const proto =
        target.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      const setValue = Object.getOwnPropertyDescriptor(proto, 'value').set;
      const value = target.value ?? '';
      const start = target.selectionStart ?? value.length;
      const end = target.selectionEnd ?? start;
      // Go through the native setter so the value tracker in React registers the change.
      setValue.call(target, value.slice(0, start) + text + value.slice(end));
      const caret = start + text.length;
      target.setSelectionRange(caret, caret);
      target.dispatchEvent(new Event('input', { bubbles: true }));
      target.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Inserting moves the caret past that full stop; do not re-offer for the same one.
    const settled = readContext();
    if (settled) lastTrigger = settled.before.replace(/\s+$/, '').slice(-60);

    scheduleUpdate(0);
    return { ok: true, inserted: text };
  }

  // -------------------------------------------------------------- caret position

  const MIRROR_PROPS = [
    'boxSizing', 'width', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth',
    'borderLeftWidth', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'letterSpacing', 'lineHeight',
    'textTransform', 'textIndent', 'wordSpacing', 'tabSize'
  ];

  /**
   * Where the caret sits on screen. A contenteditable gives it up directly; for a
   * textarea or input we mirror the element in a hidden div and measure the offset.
   */
  function caretRect() {
    // Docs draws its own caret as a positioned element — the one place its layout is
    // readable from the DOM.
    if (isDocs && isTopFrame && !target) {
      // The .kix-cursor wrapper measures zero; the caret bar inside it carries the
      // line height we need to sit clear of the text.
      const caret =
        document.querySelector('.kix-cursor-caret') || document.querySelector('.kix-cursor');
      if (!caret) return null;
      const rect = caret.getBoundingClientRect();
      const height = rect.height || 18;
      return {
        left: rect.left,
        top: rect.top,
        bottom: rect.top + height,
        right: rect.left,
        width: 0,
        height
      };
    }

    if (!target) return null;

    if (target.isContentEditable) {
      const sel = window.getSelection();
      const range = sel && sel.rangeCount ? sel.getRangeAt(0) : savedRange;
      if (!range) return target.getBoundingClientRect();
      const rects = range.getClientRects();
      if (rects.length) return rects[rects.length - 1];
      const probe = range.cloneRange();
      probe.collapse(true);
      const fallback = probe.getBoundingClientRect();
      return fallback.width || fallback.height ? fallback : target.getBoundingClientRect();
    }

    const box = target.getBoundingClientRect();
    const style = window.getComputedStyle(target);
    const mirror = document.createElement('div');
    MIRROR_PROPS.forEach((prop) => {
      mirror.style[prop] = style[prop];
    });
    Object.assign(mirror.style, {
      position: 'absolute',
      visibility: 'hidden',
      top: '0',
      left: '-9999px',
      overflow: 'hidden',
      whiteSpace: target.tagName === 'TEXTAREA' ? 'pre-wrap' : 'pre',
      wordWrap: 'break-word',
      height: 'auto'
    });

    const caret = target.selectionStart ?? (target.value || '').length;
    mirror.textContent = (target.value || '').slice(0, caret);
    const marker = document.createElement('span');
    marker.textContent = '​';
    mirror.append(marker);
    document.body.append(mirror);
    const offsetTop = marker.offsetTop;
    const offsetLeft = marker.offsetLeft;
    const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.4;
    mirror.remove();

    const left = box.left + offsetLeft - target.scrollLeft;
    const top = box.top + offsetTop - target.scrollTop;
    return { left, top, bottom: top + lineHeight, right: left, width: 0, height: lineHeight };
  }

  // -------------------------------------------------------------- inline popup

  let host = null; // shadow host element
  let shadow = null;
  let options = [];
  let cursor = -1;

  const POPUP_CSS = [
    ':host { all: initial; }',
    '.pop { position: fixed; z-index: 2147483647; width: 292px; max-width: calc(100vw - 24px);',
    '  background: var(--bg); color: var(--fg); border: 1px solid var(--line);',
    '  border-radius: 12px; box-shadow: 0 8px 28px var(--shadow);',
    '  font-family: Google Sans, Google Sans Text, Roboto, Segoe UI, Arial, sans-serif;',
    '  font-size: 13px; line-height: 1.45; overflow: hidden;',
    '  animation: seguein 140ms cubic-bezier(0.2, 0, 0, 1); }',
    '@keyframes seguein { from { opacity: 0; transform: translateY(-4px); } }',
    '@media (prefers-reduced-motion: reduce) { .pop { animation: none; } }',
    '.head { display: flex; align-items: baseline; gap: 6px; padding: 9px 12px 7px;',
    '  border-bottom: 1px solid var(--line); font-size: 11px; color: var(--muted); }',
    '.rel { font-weight: 600; color: var(--accent); letter-spacing: 0.04em; text-transform: uppercase; }',
    '.opts { display: block; padding: 4px; }',
    '.opt { display: block; width: 100%; text-align: left; padding: 7px 9px; border: 0;',
    '  border-radius: 7px; background: transparent; color: var(--fg); font: inherit; cursor: pointer; }',
    '.opt .p { font-weight: 600; }',
    '.opt .w { color: var(--muted); font-size: 11.5px; }',
    '.opt:hover, .opt.on { background: var(--hover); }',
    '.opt.on { box-shadow: inset 2px 0 0 var(--accent); }',
    '.foot { padding: 6px 12px 8px; border-top: 1px solid var(--line); font-size: 10.5px; color: var(--muted); }',
    'kbd { font: inherit; padding: 0 4px; border: 1px solid var(--line); border-radius: 4px; background: var(--hover); }',
    '.msg { padding: 11px 12px; color: var(--muted); }'
  ].join('\n');

  const THEME_LIGHT =
    '--bg: #ffffff; --fg: #1f1f1f; --muted: #5f6368; --line: #dadce0;' +
    '--accent: #0b57d0; --hover: #f0f4f9; --shadow: rgba(60,64,67,0.28);';
  const THEME_DARK =
    '--bg: #22262e; --fg: #e7e9ee; --muted: #a8afba; --line: #3b414d;' +
    '--accent: #8fb4f5; --hover: #2c313a; --shadow: rgba(0,0,0,0.55);';

  function themeVars() {
    if (prefs.theme === 'dark') return THEME_DARK;
    if (prefs.theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT;
    }
    return THEME_LIGHT;
  }

  function ensureHost() {
    if (host && host.isConnected) return;
    host = document.createElement('div');
    host.setAttribute('data-segue-popup', '');
    // A closed shadow root: page CSS cannot reach in and ours cannot leak out.
    shadow = host.attachShadow({ mode: 'closed' });
    document.documentElement.append(host);
  }

  function paintPopup(body) {
    ensureHost();
    const rect = caretRect();
    if (!rect) return;

    shadow.replaceChildren();
    const style = document.createElement('style');
    style.textContent = '.pop { ' + themeVars() + ' }\n' + POPUP_CSS;
    const pop = document.createElement('div');
    pop.className = 'pop';
    pop.setAttribute('role', 'listbox');
    pop.setAttribute('aria-label', 'Transition suggestions');
    pop.append(body);
    shadow.append(style, pop);

    // Above the line you are writing, so it never covers the words you just typed.
    // Drops below only when there is no room overhead.
    const width = 292;
    const height = pop.getBoundingClientRect().height || 200;
    const left = Math.min(Math.max(8, rect.left), window.innerWidth - width - 8);
    let top = rect.top - height - 8;
    if (top < 8) top = Math.min(rect.bottom + 8, window.innerHeight - height - 8);
    pop.style.left = left + 'px';
    pop.style.top = Math.max(8, top) + 'px';

    // Keep focus in the text field — the caret must not move while choosing.
    pop.addEventListener('pointerdown', (event) => event.preventDefault());
  }

  function message(text) {
    const div = document.createElement('div');
    div.className = 'msg';
    div.textContent = text;
    return div;
  }

  function closePopup() {
    clearTimeout(popupTimer);
    options = [];
    cursor = -1;
    if (host && host.isConnected) host.remove();
    host = null;
    shadow = null;
  }

  function highlight(next) {
    cursor = next;
    if (!shadow) return;
    shadow.querySelectorAll('.opt').forEach((node, i) => node.classList.toggle('on', i === cursor));
  }

  async function requestPopup(ctx) {
    const passage = ctx.before.trim();
    if (passage.length < MIN_SENTENCE) return;

    if (!alive()) {
      retire();
      return;
    }

    paintPopup(message('Reading your sentence…'));

    let response;
    try {
      response = await chrome.runtime.sendMessage({
        type: 'ASK_DEEPSEEK',
        passage,
        count: 5,
        avoid: overusedIn(passage)
      });
    } catch {
      closePopup();
      retire();
      return;
    }

    if (!response || !response.ok) {
      if (response && response.error === 'no-key') {
        paintPopup(message('Turn on DeepSeek suggestions in the Segue panel to get them here.'));
        setTimeout(closePopup, 3200);
      } else {
        closePopup();
      }
      return;
    }

    options = response.result.suggestions.filter((s) => s && s.phrase).slice(0, 5);
    if (!options.length) {
      closePopup();
      return;
    }

    const frag = document.createDocumentFragment();

    const head = document.createElement('div');
    head.className = 'head';
    const rel = document.createElement('span');
    rel.className = 'rel';
    rel.textContent = response.result.relation || 'next';
    head.append(rel);
    if (response.result.read) head.append(document.createTextNode(response.result.read));

    const list = document.createElement('div');
    list.className = 'opts';
    options.forEach((option, i) => {
      const button = document.createElement('button');
      button.className = 'opt';
      button.type = 'button';
      button.setAttribute('role', 'option');

      const phrase = document.createElement('div');
      phrase.className = 'p';
      phrase.textContent = option.phrase;
      button.append(phrase);

      if (option.why) {
        const why = document.createElement('div');
        why.className = 'w';
        why.textContent = option.why;
        button.append(why);
      }

      button.addEventListener('click', () => accept(i));
      list.append(button);
    });

    const foot = document.createElement('div');
    foot.className = 'foot';
    foot.append(document.createTextNode('↑↓ pick · '));
    const enter = document.createElement('kbd');
    enter.textContent = 'Enter';
    foot.append(enter, document.createTextNode(' insert · '));
    const esc = document.createElement('kbd');
    esc.textContent = 'Esc';
    foot.append(esc, document.createTextNode(' dismiss'));

    frag.append(head, list, foot);
    paintPopup(frag);
    highlight(0);
  }

  function accept(index) {
    const option = options[index];
    if (!option) return;
    closePopup();
    insert(option.phrase);
  }

  /**
   * The writing surface keeps focus while the popup is open, so the popup reads keys
   * here instead. Attached in capture phase to the page and, on Docs, to the hidden
   * input as well — otherwise Docs would swallow Enter as a new paragraph.
   */
  function onPopupKey(event) {
    if (!options.length || !host) return;

    const claim = () => {
      event.preventDefault();
      event.stopPropagation();
    };

    if (event.key === 'Escape') {
      claim();
      closePopup();
      return;
    }
    if (event.key === 'ArrowDown') {
      claim();
      highlight((cursor + 1) % options.length);
      return;
    }
    if (event.key === 'ArrowUp') {
      claim();
      highlight((cursor - 1 + options.length) % options.length);
      return;
    }
    if (event.key === 'Enter' || event.key === 'Tab') {
      if (cursor < 0) return;
      claim();
      accept(cursor);
      return;
    }
    // Anything else means they kept writing — get out of the way.
    if (event.key.length === 1 || event.key === 'Backspace') closePopup();
  }

  document.addEventListener('keydown', onPopupKey, true);

  // ------------------------------------------------------------ overuse counter

  const WATCHED = [
    'however', 'moreover', 'furthermore', 'therefore', 'in addition', 'consequently',
    'thus', 'additionally', 'nevertheless', 'for example', 'in conclusion', 'firstly',
    'on the other hand', 'as a result', 'in fact', 'indeed'
  ];

  /** Transitions already leaned on twice or more, so we stop suggesting them. */
  function overusedIn(passage) {
    const text = passage.toLowerCase();
    return WATCHED.filter((phrase) => text.split(phrase).length - 1 >= 2);
  }

  // ------------------------------------------------------------------ plumbing

  function scheduleUpdate(delay = IDLE_MS) {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      const ctx = readContext();
      if (!ctx || !alive()) return;
      try {
        chrome.runtime.sendMessage({ type: 'CONTEXT_UPDATED', context: ctx }).catch(() => {});
      } catch {
        retire();
      }
    }, delay);
  }

  document.addEventListener('focusin', (e) => remember(e.target), true);
  document.addEventListener(
    'input',
    (e) => {
      if (e.target !== target) return;
      scheduleUpdate();
      maybeAutoSuggest();
    },
    true
  );
  document.addEventListener('keyup', (e) => { if (e.target === target) scheduleUpdate(); }, true);
  document.addEventListener('mouseup', (e) => { if (e.target === target) scheduleUpdate(300); }, true);
  document.addEventListener('scroll', () => closePopup(), true);
  document.addEventListener('focusout', (e) => { if (e.target === target) closePopup(); }, true);
  window.addEventListener('resize', () => closePopup());

  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    // Frames with nothing to offer stay silent, keeping the one-answer contract.
    if (msg && msg.type === 'GET_CONTEXT') {
      const ctx = readContext();
      if (ctx) sendResponse(ctx);
      return false;
    }
    if (msg && msg.type === 'INSERT') {
      const usable = (target && target.isConnected) || (isDocs && isTopFrame);
      if (!usable) return false;
      const result = insert(msg.phrase);
      if (result && typeof result.then === 'function') {
        result.then(sendResponse); // the Docs path confirms asynchronously
        return true;
      }
      sendResponse(result);
      return false;
    }
    if (msg && msg.type === 'TRIGGER_POPUP') {
      const ctx = readContext();
      if (!ctx) return false;
      if (ctx.kind === 'docs' && !docsBuffer.trim()) return false;
      sendResponse({ ok: true });
      requestPopup(ctx);
      return false;
    }
    return false;
  });

  watchDocsTyping();
  remember(document.activeElement);
})();

