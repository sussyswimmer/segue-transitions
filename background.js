// Segue — service worker (module).
// Opens the panel, keeps content scripts alive, runs the keyboard command, and makes
// the DeepSeek call on behalf of the inline popup.

import { askDeepSeek } from './ask.js';

function armPanel() {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {});
}

/**
 * Reloading the extension kills the content scripts already running in open tabs —
 * they linger as dead code that throws "Extension context invalidated" on every
 * keystroke. Chrome does not replace them by itself; manifest content scripts only run
 * on navigation. So we re-inject into every open tab, and a reload takes effect at once
 * instead of after the user refreshes each tab by hand.
 */
async function reinjectEverywhere() {
  const tabs = await chrome.tabs.query({ url: ['http://*/*', 'https://*/*'] });
  await Promise.all(
    tabs.map((tab) =>
      chrome.scripting
        .executeScript({ target: { tabId: tab.id, allFrames: true }, files: ['content.js'] })
        .catch(() => {}) // restricted pages (Web Store, PDF viewer) simply refuse
    )
  );
}

chrome.runtime.onInstalled.addListener(() => {
  armPanel();
  reinjectEverywhere();
});

chrome.runtime.onStartup.addListener(armPanel);

// Ctrl+Shift+Space — ask for suggestions at the cursor without touching the mouse.
chrome.commands.onCommand.addListener(async (command) => {
  if (command !== 'suggest-here') return;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.id) return;
  chrome.tabs.sendMessage(tab.id, { type: 'TRIGGER_POPUP' }, () => void chrome.runtime.lastError);
});

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  // The page was already open when the extension loaded; put the script in place.
  if (msg && msg.type === 'ENSURE_CONTENT_SCRIPT') {
    chrome.scripting
      .executeScript({ target: { tabId: msg.tabId, allFrames: true }, files: ['content.js'] })
      .then(() => sendResponse({ ok: true }))
      .catch((err) => sendResponse({ ok: false, error: String(err.message || err) }));
    return true;
  }

  // The inline popup's request — a content script cannot call the API itself.
  if (msg && msg.type === 'ASK_DEEPSEEK') {
    (async () => {
      const stored = await chrome.storage.local.get(['apiKey', 'register']);
      if (!stored.apiKey) {
        sendResponse({ ok: false, error: 'no-key' });
        return;
      }
      try {
        const result = await askDeepSeek({
          apiKey: stored.apiKey,
          register: stored.register || 'balanced',
          passage: msg.passage,
          count: msg.count || 5,
          avoid: msg.avoid || []
        });
        sendResponse({ ok: true, result });
      } catch (err) {
        sendResponse({ ok: false, error: String(err.message || err) });
      }
    })();
    return true; // keep the channel open for the async response
  }

  return false;
});
