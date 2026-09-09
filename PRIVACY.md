# Privacy Policy — Segue

**Last updated: 8 September 2026**

Segue is a Chrome extension that suggests transition words for the sentence you are
writing. This policy describes exactly what it does with your data. It is short because
Segue does very little.

## There is no Segue server

Segue has no backend. Nothing is sent to the developer, ever. There is no analytics, no
telemetry, no tracking, no advertising, and no sale or sharing of data with anyone.

## What leaves your browser, and when

**Only while "Suggest transitions with DeepSeek" is switched on in Settings.** It is on
by default. Switch it off and nothing leaves your browser at all — the built-in library of
transition phrases works entirely offline.

While it is on and you finish a sentence (or press the shortcut, or use the side panel),
Segue sends **up to the last 900 characters of text before your cursor** to DeepSeek's API
at `https://api.deepseek.com` so it can suggest a fitting transition. The request is
authenticated with an API key that ships inside the extension, so you do not need an
account of your own. If you enter a personal key in Settings, that key is used instead.

Nothing else is transmitted. Segue does not send the rest of the document, the page URL,
the page contents, your identity, or any browsing history.

In Google Docs specifically, Google renders documents to a canvas rather than as page
text, so Segue cannot read the document at all. Instead it keeps a short in-memory record
of what you have typed during the current session in order to know your last sentence.
That record is never written to disk and is discarded when the tab closes.

### DeepSeek is a third party

Text sent for suggestions is processed by DeepSeek under **their** terms and privacy
policy, not this one. Read them before leaving suggestions switched on:
<https://platform.deepseek.com/downloads/DeepSeek%20Privacy%20Policy.html>

If you would rather no text ever left your machine, untick "Suggest transitions with
DeepSeek" in Settings. The library still works.

## What is stored on your device

Stored in `chrome.storage.local`, which is local to your Chrome profile:

| Item | Why |
| --- | --- |
| Whether DeepSeek suggestions are switched on | Preference |
| Your own DeepSeek API key, if you entered one | To authenticate suggestion requests in place of the built-in key |
| Theme (light / dark / system) | Preference |
| Register (plain / balanced / formal) | Preference |
| Which rare tiers you have opened | Preference |
| Whether the pop-up on sentence end is enabled | Preference |

**A personal API key is stored unencrypted**, which is the only storage Chrome extensions have.
Anyone with access to your Chrome profile can read it. Treat it as you would a saved
password on a shared computer, and revoke it from the DeepSeek dashboard if that ever
matters. Uninstalling Segue deletes everything above.

## Permissions, and why each is needed

| Permission | Reason |
| --- | --- |
| Access to the sites you visit | To read the text box you are typing in and insert your chosen phrase at the cursor. Text is only read from the field you are actively editing. |
| `storage` | To keep your key and preferences on your device |
| `tabs` | So the side panel can address the tab you are writing in |
| `scripting` | To restore Segue in already-open tabs after it updates, without you refreshing them |
| `clipboardWrite` | Fallback: if a page refuses direct insertion, the phrase is copied so you can paste it |
| `api.deepseek.com` | The only network destination Segue can reach |

Segue loads no remote code. All code ships inside the extension package.

## Children

Segue is a writing tool for general audiences and is not directed at children under 13.

## Changes

Material changes to this policy will be published in this file, with the date above
updated. The version history is public in the repository.

## Contact

maxwell.olander@gmail.com
