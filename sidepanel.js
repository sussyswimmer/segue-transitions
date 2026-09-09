// Segue — side panel.
// Reads the caret context out of the page, asks DeepSeek which transition the next
// sentence actually needs, and writes the chosen phrase back at the caret.

import { RELATIONS, RELATION_BY_ID, RELATION_IDS } from './transitions.js';
import { SIGNPOSTS } from './signposts.js';
import { askDeepSeek, resolveKey } from './ask.js';

const MIN_CHARS = 25; // below this there is nothing to reason about
const MIN_GAP_MS = 1500; // floor between automatic calls

const BANKS = { transitions: RELATIONS, signposts: SIGNPOSTS };

/** Phrases worth warning about when a passage leans on them. */
const WATCHED = [
  'however', 'moreover', 'furthermore', 'therefore', 'in addition', 'consequently',
  'thus', 'additionally', 'nevertheless', 'for example', 'in conclusion', 'firstly',
  'on the other hand', 'as a result', 'in fact', 'indeed', 'overall', 'ultimately'
];

const el = {
  fieldName: document.getElementById('field-name'),
  excerpt: document.getElementById('excerpt'),
  docsMode: document.getElementById('docs-mode'),
  manual: document.getElementById('manual'),
  manualGo: document.getElementById('manual-go'),
  fittedSection: document.getElementById('fitted-section'),
  fittedList: document.getElementById('fitted-list'),
  relationRead: document.getElementById('relation-read'),
  refresh: document.getElementById('refresh'),
  status: document.getElementById('status'),
  groups: document.getElementById('groups'),
  filters: document.getElementById('filters'),
  rareAll: document.getElementById('rare-all'),
  overuse: document.getElementById('overuse'),
  register: document.querySelectorAll('.register:not(.bank) .seg'),
  bank: document.querySelectorAll('.bank .seg'),
  apiKey: document.getElementById('api-key'),
  theme: document.getElementById('theme'),
  autoToggle: document.getElementById('auto-toggle'),
  onlineToggle: document.getElementById('online-toggle'),
  popupToggle: document.getElementById('popup-toggle'),
  saveSettings: document.getElementById('save-settings'),
  settingsStatus: document.getElementById('settings-status'),
  settings: document.getElementById('settings')
};

let settings = {
  apiKey: '', // the user's own key, if any — overrides the built-in one
  online: true, // send text to DeepSeek at all
  auto: true,
  autoPopup: true,
  theme: 'light',
  register: 'balanced',
  openRare: []
};
let context = null;
let activeBank = 'transitions';
let openRare = new Set(); // group ids showing their rare tier
let activeFilters = new Set(); // group ids to show; empty means all
let overused = new Set(); // phrases this passage already leans on
let lastAsked = '';
let lastCallAt = 0;
let inFlight = null;
let askTimer = 0;

// ------------------------------------------------------------------ settings

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
}

async function loadSettings() {
  const stored = await chrome.storage.local.get([
    'apiKey', 'online', 'auto', 'autoPopup', 'theme', 'register', 'openRare'
  ]);
  settings = {
    apiKey: stored.apiKey || '',
    online: stored.online !== false,
    auto: stored.auto !== false,
    autoPopup: stored.autoPopup !== false,
    theme: stored.theme || 'light',
    register: stored.register || 'balanced',
    openRare: Array.isArray(stored.openRare) ? stored.openRare : []
  };
  openRare = new Set(settings.register === 'formal' ? RELATION_IDS : settings.openRare);
  el.apiKey.value = settings.apiKey;
  el.onlineToggle.checked = settings.online;
  el.autoToggle.checked = settings.auto;
  el.popupToggle.checked = settings.autoPopup;
  el.theme.value = settings.theme;
  applyTheme(settings.theme);
  paintRegister();
  // Only open Settings unprompted when there is genuinely no way to get suggestions.
  if (!activeKey() && settings.online) el.settings.open = true;
}

/** The key requests will actually use, or '' when suggestions are off or no key exists. */
function activeKey() {
  return resolveKey(settings);
}

el.saveSettings.addEventListener('click', async () => {
  settings.apiKey = el.apiKey.value.trim();
  settings.online = el.onlineToggle.checked;
  settings.auto = el.autoToggle.checked;
  settings.autoPopup = el.popupToggle.checked;
  settings.theme = el.theme.value;
  applyTheme(settings.theme);
  // The content script watches storage, so the popup preference takes effect at once.
  await chrome.storage.local.set({
    apiKey: settings.apiKey,
    online: settings.online,
    auto: settings.auto,
    autoPopup: settings.autoPopup,
    theme: settings.theme
  });
  el.settingsStatus.textContent = activeKey()
    ? 'Saved.'
    : settings.online ? 'Saved — library only, no key available.' : 'Saved — library only.';
  setTimeout(() => (el.settingsStatus.textContent = ''), 2500);
  if (activeKey() && context) askForFit(context, { force: true });
  else hideFitted();
});

// Live theme preview while the select changes, so the choice is visible before saving.
el.theme.addEventListener('change', () => applyTheme(el.theme.value));

// ------------------------------------------------------- register + rare tiers

/** Group ids in whichever bank is on screen. */
function currentIds() {
  return BANKS[activeBank].map((group) => group.id);
}

function paintRegister() {
  el.register.forEach((button) => {
    const on = button.dataset.register === settings.register;
    button.classList.toggle('on', on);
    button.setAttribute('aria-checked', String(on));
  });
  const ids = currentIds();
  const allOpen = ids.every((id) => openRare.has(id));
  el.rareAll.textContent = allOpen ? 'Hide all rare' : 'Show all rare';
}

el.bank.forEach((button) => {
  button.addEventListener('click', () => {
    activeBank = button.dataset.bank;
    el.bank.forEach((other) => {
      const on = other === button;
      other.classList.toggle('on', on);
      other.setAttribute('aria-checked', String(on));
    });
    activeFilters.clear(); // filters name groups, and the groups just changed
    paintRegister();
    renderFilters();
    renderLibrary();
  });
});

el.register.forEach((button) => {
  button.addEventListener('click', async () => {
    settings.register = button.dataset.register;
    // Register sets the floor: plain hides every rare tier, formal opens them all,
    // balanced leaves whatever the user has opened per group.
    if (settings.register === 'plain') openRare.clear();
    if (settings.register === 'formal') openRare = new Set([...RELATION_IDS, ...currentIds()]);
    await persistRare();
    paintRegister();
    renderLibrary();
  });
});

el.rareAll.addEventListener('click', async () => {
  const ids = currentIds();
  const allOpen = ids.every((id) => openRare.has(id));
  ids.forEach((id) => (allOpen ? openRare.delete(id) : openRare.add(id)));
  await persistRare();
  paintRegister();
  renderLibrary();
});

async function persistRare() {
  settings.openRare = [...openRare];
  await chrome.storage.local.set({ register: settings.register, openRare: settings.openRare });
}

// ------------------------------------------------------------- page context

async function activeTabId() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab?.id ?? null;
}

async function requestContext() {
  const tabId = await activeTabId();
  if (tabId == null) return null;

  const ask = () =>
    new Promise((resolve) => {
      chrome.tabs.sendMessage(tabId, { type: 'GET_CONTEXT' }, (response) => {
        // No listener answers when no frame holds an editable caret — a normal
        // outcome, not an error, so swallow lastError and report "nothing".
        void chrome.runtime.lastError;
        resolve(response ?? null);
      });
    });

  let result = await ask();
  if (!result) {
    // The page may predate the extension being loaded; inject and try once more.
    const injected = await chrome.runtime.sendMessage({ type: 'ENSURE_CONTENT_SCRIPT', tabId });
    if (injected?.ok) result = await ask();
  }
  return result;
}

function applyContext(next) {
  context = next;

  if (!next) {
    el.fieldName.textContent = '';
    el.excerpt.hidden = false;
    el.excerpt.classList.remove('live');
    el.excerpt.textContent = 'Click into any text box on the page.';
    el.docsMode.hidden = true;
    return;
  }

  el.fieldName.textContent = next.field || '';

  if (next.kind === 'docs') {
    el.excerpt.hidden = true;
    el.docsMode.hidden = false;
    return;
  }

  el.docsMode.hidden = true;
  el.excerpt.hidden = false;
  el.excerpt.classList.add('live');
  countOveruse(next.before);

  const tail = next.before.replace(/\s+/g, ' ').trimStart();
  const shown = tail.length > 220 ? '…' + tail.slice(-220) : tail;
  el.excerpt.textContent = shown || 'Empty field — start writing.';
  const caret = document.createElement('span');
  caret.className = 'caret';
  el.excerpt.append(caret);

  if (settings.auto) scheduleAsk(next);
}

function scheduleAsk(ctx) {
  clearTimeout(askTimer);
  askTimer = setTimeout(() => askForFit(ctx), 350);
}

/**
 * Count the transitions this passage already leans on. Twice is worth flagging — the
 * thing that makes an essay read as padded is the same connective four paragraphs running.
 */
function countOveruse(passage) {
  const text = ' ' + passage.toLowerCase() + ' ';
  const hits = [];
  overused = new Set();

  WATCHED.forEach((phrase) => {
    const count = text.split(phrase).length - 1;
    if (count >= 2) {
      hits.push({ phrase, count });
      overused.add(phrase);
    }
  });

  el.overuse.replaceChildren();
  if (!hits.length) {
    el.overuse.hidden = true;
    markOverusedChips();
    return;
  }

  hits.sort((a, b) => b.count - a.count);
  const label = document.createElement('span');
  label.className = 'overuse-label';
  label.textContent = 'Already leaning on';
  el.overuse.append(label);

  hits.slice(0, 4).forEach((hit) => {
    const tag = document.createElement('span');
    tag.className = 'overuse-tag';
    tag.textContent = `${hit.phrase} ×${hit.count}`;
    el.overuse.append(tag);
  });

  el.overuse.hidden = false;
  markOverusedChips();
}

/** Grey out library chips the passage has already used, so the eye skips them. */
function markOverusedChips() {
  el.groups.querySelectorAll('.chip').forEach((chip) => {
    const phrase = (chip.dataset.phrase || '').replace(/[,:]$/, '');
    chip.classList.toggle('used', overused.has(phrase));
  });
}

// Docs mode: the sentence is typed by hand, so ask on demand.
el.manualGo.addEventListener('click', () => {
  const text = el.manual.value.trim();
  if (!text) return;
  askForFit({ kind: 'manual', before: text, after: '' }, { force: true });
});

el.manual.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) el.manualGo.click();
});

// -------------------------------------------------------------- the DeepSeek ask

async function askForFit(ctx, { force = false } = {}) {
  if (!ctx) return;

  const apiKey = activeKey();
  if (!apiKey) {
    setStatus(
      settings.online
        ? 'No API key — showing the standing library only.'
        : 'Online suggestions are off — showing the standing library only.',
      ''
    );
    hideFitted();
    return;
  }

  const passage = ctx.before.trim();
  if (passage.length < MIN_CHARS) {
    setStatus('Write a sentence or so and suggestions will follow.', '');
    hideFitted();
    return;
  }

  const fingerprint = passage.slice(-400) + '|' + settings.register;
  if (!force && fingerprint === lastAsked) return;
  if (!force && Date.now() - lastCallAt < MIN_GAP_MS) {
    scheduleAsk(ctx);
    return;
  }

  lastAsked = fingerprint;
  lastCallAt = Date.now();

  if (inFlight) inFlight.abort();
  const controller = new AbortController();
  inFlight = controller;
  setStatus('Weighing the sentence…', 'working');

  try {
    const result = await askDeepSeek({
      apiKey,
      register: settings.register,
      passage,
      count: 8,
      avoid: [...overused], // do not offer what this passage has already worn out
      signal: controller.signal
    });
    renderFitted(result);
    setStatus('', '');
  } catch (err) {
    if (err.name === 'AbortError') return;
    hideFitted();
    setStatus(err.message || 'Could not reach DeepSeek.', 'problem');
  } finally {
    if (inFlight === controller) inFlight = null;
  }
}

// ------------------------------------------------------------------ rendering

function setStatus(text, tone) {
  el.status.textContent = text;
  el.status.className = 'status' + (tone ? ' ' + tone : '');
}

function hideFitted() {
  el.fittedSection.hidden = true;
  markSuggested([]);
}

function renderFitted(payload) {
  const suggestions = Array.isArray(payload?.suggestions) ? payload.suggestions.slice(0, 10) : [];
  if (!suggestions.length) {
    hideFitted();
    return;
  }

  const relation = RELATION_BY_ID[payload?.relation];
  el.relationRead.replaceChildren();
  if (relation) {
    const b = document.createElement('b');
    b.textContent = `${relation.name.toUpperCase()}  ${relation.glyph}`;
    el.relationRead.append(b);
  }
  if (payload?.read) {
    el.relationRead.append(document.createTextNode((relation ? '  ·  ' : '') + payload.read));
  }

  el.fittedList.replaceChildren();
  suggestions.forEach((item, i) => {
    const phrase = String(item?.phrase ?? '').trim();
    if (!phrase) return;

    const li = document.createElement('li');
    li.style.animationDelay = `${i * 40}ms`;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'fit-btn';

    const strong = document.createElement('span');
    strong.className = 'phrase';
    strong.textContent = phrase;
    button.append(strong);

    if (item?.why) {
      const why = document.createElement('span');
      why.className = 'why';
      why.textContent = String(item.why);
      button.append(why);
    }

    button.addEventListener('click', () => insertPhrase(phrase, button));
    li.append(button);
    el.fittedList.append(li);
  });

  el.fittedSection.hidden = false;
  markSuggested(suggestions.map((s) => String(s?.phrase ?? '').toLowerCase()));
}

function renderFilters() {
  el.filters.replaceChildren();
  BANKS[activeBank].forEach((relation) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'filter' + (activeFilters.has(relation.id) ? ' on' : '');
    button.textContent = relation.name;
    button.setAttribute('aria-pressed', String(activeFilters.has(relation.id)));
    button.addEventListener('click', () => {
      if (activeFilters.has(relation.id)) activeFilters.delete(relation.id);
      else activeFilters.add(relation.id);
      renderFilters();
      renderLibrary();
    });
    el.filters.append(button);
  });
}

function renderLibrary() {
  el.groups.replaceChildren();

  const shown = BANKS[activeBank].filter(
    (r) => activeFilters.size === 0 || activeFilters.has(r.id)
  );

  shown.forEach((relation) => {
    const section = document.createElement('section');
    section.className = 'group';

    const head = document.createElement('div');
    head.className = 'group-head';

    const name = document.createElement('h3');
    name.className = 'group-name';
    name.textContent = relation.name;

    const glyph = document.createElement('span');
    glyph.className = 'group-glyph';
    glyph.textContent = relation.glyph;

    // Per-situation rare toggle: open the formal tier for Contrast without
    // dragging Sequence and Example along with it.
    const rareBtn = document.createElement('button');
    rareBtn.type = 'button';
    rareBtn.className = 'rare-toggle';
    const open = openRare.has(relation.id);
    rareBtn.textContent = open ? `− rare` : `+ ${relation.rare.length} rare`;
    rareBtn.setAttribute('aria-pressed', String(open));
    rareBtn.setAttribute('aria-label', `${open ? 'Hide' : 'Show'} rare ${relation.name} transitions`);
    rareBtn.addEventListener('click', async () => {
      if (openRare.has(relation.id)) openRare.delete(relation.id);
      else openRare.add(relation.id);
      if (settings.register !== 'balanced') settings.register = 'balanced';
      await persistRare();
      paintRegister();
      renderLibrary();
    });

    head.append(name, glyph, rareBtn);

    const gloss = document.createElement('p');
    gloss.className = 'group-gloss';
    gloss.textContent = relation.gloss;

    const chips = document.createElement('div');
    chips.className = 'chips';

    const entries = [
      ...relation.common.map((p) => [p, false]),
      ...(open ? relation.rare.map((p) => [p, true]) : [])
    ];

    entries.forEach(([phrase, isRare]) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip' + (isRare ? ' rare' : '');
      chip.textContent = phrase;
      chip.dataset.phrase = phrase.toLowerCase();
      chip.addEventListener('click', () => insertPhrase(phrase, chip));
      chips.append(chip);
    });

    section.append(head, gloss, chips);
    el.groups.append(section);
  });

  markOverusedChips();
}

/** Mark library chips DeepSeek also picked, so the two lists read as one system. */
function markSuggested(phrases) {
  const wanted = new Set(phrases);
  el.groups.querySelectorAll('.chip').forEach((chip) => {
    chip.classList.toggle('suggested', wanted.has(chip.dataset.phrase));
  });
}

// -------------------------------------------------------------------- insert

async function insertPhrase(phrase, sourceEl) {
  const tabId = await activeTabId();
  if (tabId == null) return;

  // On Docs the insertion path is best-effort, so prime the clipboard first, while the
  // click that triggered this is still a fresh user gesture.
  const needsClipboardSafety = context?.kind === 'docs' || context == null;
  if (needsClipboardSafety) await copyQuietly(phrase);

  chrome.tabs.sendMessage(tabId, { type: 'INSERT', phrase }, async (response) => {
    void chrome.runtime.lastError;

    if (response?.ok) {
      setStatus(`Inserted "${response.inserted.trim()}".`, '');
      sourceEl?.blur();
      setTimeout(() => refreshContext(), 120);
      return;
    }

    const copied = needsClipboardSafety || (await copyQuietly(phrase));
    if (copied) {
      setStatus(`Copied "${phrase}" — click into the document and press Ctrl+V.`, '');
    } else {
      setStatus('Could not insert. Click back into the text box and try again.', 'problem');
    }
  });
}

async function copyQuietly(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// -------------------------------------------------------------------- wiring

async function refreshContext() {
  applyContext(await requestContext());
}

el.refresh.addEventListener('click', () => {
  const ctx = context?.kind === 'docs' ? { kind: 'manual', before: el.manual.value, after: '' } : context;
  askForFit(ctx, { force: true });
});

// Content scripts push an update whenever typing settles.
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg?.type !== 'CONTEXT_UPDATED') return;
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (tab && sender.tab && tab.id === sender.tab.id) applyContext(msg.context);
  });
});

chrome.tabs.onActivated.addListener(() => refreshContext());
chrome.tabs.onUpdated.addListener((_id, info) => {
  if (info.status === 'complete') refreshContext();
});
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) refreshContext();
});

await loadSettings();
renderFilters();
renderLibrary();
await refreshContext();
