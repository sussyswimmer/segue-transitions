# Segue — transitions in context

A Chrome side-panel extension. It watches whichever text box you're writing in, sends the tail
of your passage to DeepSeek, and offers transition words that fit the logical move your next
sentence needs to make. Underneath sits a standing library of ~1,200 transitions across 24
relations and ~390 signposting phrases across 16 essay moves, which works with no key and no
network.

Styled to the Segue mark: warm near-black, paper white, and one red square for the full stop.
Swiss editorial — hard corners, hairline rules, a system grotesque rather than a webfont, since
DeepSeek is meant to be the only host the extension reaches. Light by default; Dark and Match
system are in Settings.

## Install

1. Open `chrome://extensions`.
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked** and choose this folder.
4. Pin the extension, click its icon to open the side panel.
5. Start writing. Suggestions work out of the box on the key the extension ships with.

## The built-in key

`config.js` holds `BUILT_IN_KEY`, the DeepSeek key every install uses. It is empty in the
repository: paste your key in locally before you zip for the Web Store, and do not commit it.
Anyone who unpacks the extension can read that key, so treat it as public — put a spending cap
or a prepaid balance on the DeepSeek account behind it, and rotate it if usage looks wrong.

Settings still has a field for a personal key. If someone enters one it takes precedence over the
built-in key, is stored in this Chrome profile's extension storage, and is sent only to
`api.deepseek.com`. A **Suggest transitions with DeepSeek** switch above it turns the network
off entirely, leaving the standing library.

**Reload the extension after any code change**, and refresh any tab that was already open.

## Google Docs

Docs paints your document to a `<canvas>`, so its text is genuinely not in the DOM and cannot be
read back. Everything below was verified against a live Doc rather than assumed.

**Reading — the keystroke mirror.** Docs routes every keypress through a hidden contenteditable
(`.docs-texteventtarget-iframe`). Segue listens there and mirrors what you type into a rolling
buffer, so it knows the sentence you just finished even though it cannot read the document. The
buffer only holds what you typed *this session* — open an old doc and it starts empty until you
write. The panel's typed-context box remains as a manual fallback.

**Inserting — a synthetic paste.** `document.execCommand('insertText')` is rejected outright by
current Docs (verified: returns `false`, caret does not move). What does work is dispatching a
`paste` event carrying a `DataTransfer` at that same hidden editable — Docs applies it at the
cursor. Success is confirmed by watching `.kix-cursor` move, since Docs does not cancel the event.
The clipboard fallback stays behind it for when the side panel has taken window focus.

**Positioning.** The popup anchors to `.kix-cursor-caret` — the caret bar Docs draws. (The
`.kix-cursor` wrapper around it measures zero height, which is a trap.)

Docs also enforces Trusted Types, so the popup is built with `createElement`/`textContent`
throughout; any `innerHTML` would throw.

Everywhere else — Gmail, Notion, Slack, Canvas, Overleaf, Substack, WordPress, ordinary forms —
reading and insertion are direct and caret-accurate.

## The inline popup

Finish a sentence — type a full stop, question mark or exclamation — and a small list opens at
your cursor with the five transitions that fit what you just wrote. `↑↓` to pick, `Enter` to
insert, `Esc` to dismiss; typing anything else dismisses it too. `Alt+T` asks for it at any
moment — that is the only registered command, and Chrome lets you rebind it at
`chrome://extensions/shortcuts`. The panel opens from the toolbar icon.

The trigger is deliberately picky: it ignores decimals (`3.14`), list numbers, abbreviations
(`e.g.`, `Dr.`, `etc.`), ellipses, and sentences under 30 characters, and it fires once per full
stop rather than on every keystroke after it. Turn it off in Settings if you'd rather drive the
panel by hand.

The popup lives in a closed shadow root, so page CSS can't reach into it and its styles can't leak
onto the page. Focus stays in your text field the whole time — the caret never moves while you're
choosing.

## Overuse flagging

The panel counts the connectives a passage already leans on. Anything used twice or more shows in
a strip under the suggestions (`however ×3`), gets struck through in the library, and is named in
the instruction sent to DeepSeek so it stops offering them. The thing that makes an essay read as
padded is the same transition four paragraphs running.

## Two banks

**Transitions** connects one sentence to the next. **Signposts** covers the other moves an essay
makes: stating the claim, mapping what follows, posing a question, bringing in a source and
summarising it, raising a counterargument and answering it, weighing the evidence, hedging,
defining a term, refining the claim, naming the stakes, directing the reader, acknowledging
limits, closing a paragraph or the essay. The switch sits at the top of the library; each bank
has its own filters and rare tiers.

## Controls

- **Register** (Plain / Balanced / Formal) sets how exotic things get. It steers both the library
  and the instruction sent to DeepSeek: Plain bans archaic and Latin forms, Formal actively
  favours them.
- **Per-situation rare toggles** — every relation has its own `+ N rare` button, so you can open
  the formal tier for Contrast (*Be that as it may*, *Contrariwise*) without dragging Sequence
  and Example along with it. **Show all rare** flips every group at once.
- **Situation filters** — the row of relation names filters the library. Click several to combine;
  click again to clear.
- **Suggest transitions with DeepSeek** is the master switch for sending text anywhere. Off, the
  panel and the popup fall back to the library alone.
- Suggestions refresh ~0.7s after you stop typing. Turn that off in Settings and drive it with
  **Ask again** instead.

Inserted phrases are fitted to their surroundings — "However," lands as "however," mid-sentence,
with spacing adjusted to what's on either side of the caret.

## The library

24 relations, each with a common tier and a rare/formal tier. The common tier mixes the handbook
connectives with everyday sayings that do the same job (*On the flip side*, *The long and short
of it is*, *Nine times out of ten*, *At the end of the day*):

Addition · Similarity · Contrast · Concession · Refutation · Cause · Effect · Purpose · Condition ·
Exception · Alternative · Sequence · Time · Emphasis · Example · Evidence · Clarification ·
Comparison · Generalisation · Qualification · Topic shift · Reference back · Digression · Conclusion

Rare tiers carry the things you won't get from a school handout: *A fortiori*, *Mutatis mutandis*,
*Pace*, *Inasmuch as*, *En passant*, *Whereupon*, *In fine*, *Summa summarum*, *Pari passu*,
*Nathless*, *Arguendo*, *Non sequitur*, *Seriatim*, *Heretofore*, *Nota bene*, *Inter alia*,
*Scilicet*, *Cum grano salis*, *Obiter dictum*, *Q.E.D.*

## Files

| File | Role |
| --- | --- |
| `manifest.json` | MV3 manifest — side panel, content script, DeepSeek host permission |
| `background.js` | Opens the panel on toolbar click; re-injects the content script on demand |
| `content.js` | Tracks the focused field, extracts caret context, inserts at the caret, Docs path |
| `sidepanel.html/.css/.js` | The panel UI, controls, and the DeepSeek call |
| `config.js` | Build-time settings — the built-in DeepSeek key |
| `transitions.js` | The standing library — 24 relations, common + rare tiers |
| `signposts.js` | The signposting bank — 16 essay moves, common + rare tiers |

## Cost

Each round trip is roughly 400 input + 300 output tokens on `deepseek-chat` — fractions of a cent.
The `MIN_GAP_MS` floor and the context fingerprint in `sidepanel.js` stop it re-asking about text
it has already seen.
