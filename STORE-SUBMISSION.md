# Chrome Web Store submission pack

Everything the dashboard will ask for, pre-written. **Segue is a new item — at the
dashboard, click "Add new item". Do not open or update the Debate Buddy listing.**

---

## Before you upload

You need a Chrome Web Store developer account: a **one-time US$5 registration fee**, paid
by you at <https://chrome.google.com/webstore/devconsole>. I can't pay it or create the
account, and the store has no API for a first-time listing — the initial submission has
to go through the dashboard by hand.

**Privacy policy URL — done.** It is live and publicly reachable at:

```
https://sussyswimmer.github.io/segue-transitions/
```

Served from `docs/index.html` on GitHub Pages over HTTPS. Edit that file and push to update it.

---

## Listing fields

**Item name**
```
Segue - transitions in context
```

**Short description** (132 char limit; this is 121)
```
Reads the sentence you just wrote and suggests the transition that fits what comes next. Works out of the box, no account needed.
```

**Category:** Productivity → Workflow & Planning
**Language:** English

**Detailed description**
```
Segue watches the text box you are writing in and, the moment you finish a sentence,
offers the transition words that actually fit what comes next — not a generic list, but
options chosen for the logical move your next sentence needs to make.

HOW IT WORKS

Type a full stop and a small panel opens at your cursor with five ranked options, each
with a few words on the shade of meaning it carries. Arrow keys to choose, Enter to
insert, Escape to dismiss. The phrase lands with spacing and capitalisation fitted to the
surrounding text, so "However," becomes "however," when it falls mid-sentence.

Press Alt+T to ask for suggestions at any moment.

A STANDING LIBRARY THAT WORKS OFFLINE

Underneath sits a browsable library of over 1,200 phrases across 24 rhetorical relations —
Addition, Contrast, Concession, Refutation, Cause, Effect, Purpose, Condition, Exception,
Alternative, Sequence, Time, Emphasis, Example, Evidence, Clarification, Comparison,
Generalisation, Qualification, Topic shift, Reference back, Digression, Conclusion and
Similarity. Each relation carries a plain tier and a rare, formal tier — A fortiori,
Mutatis mutandis, Inasmuch as, Be that as it may, In fine. Open the rare tier for
Contrast without dragging Sequence along with it.

A second bank covers the moves an essay makes beyond joining sentences: stating a claim,
mapping what follows, bringing in a source, raising a counterargument and answering it,
hedging, defining a term, naming the stakes, closing a paragraph.

The library needs no API key and no network.

IT NOTICES WHAT YOU OVERUSE

Segue counts the connectives your passage already leans on. Anything used twice or more
is struck through in the library and excluded from what gets suggested — because the
thing that makes an essay read as padded is the same transition four paragraphs running.

WHERE IT WORKS

Any ordinary text box: Gmail, Notion, Slack, Canvas, Overleaf, Substack, WordPress,
forums, forms. Google Docs is supported too, which takes special handling — Docs draws
your text on a canvas, so Segue mirrors your keystrokes to follow your sentence and
inserts through Docs' own input path.

NO ACCOUNT NEEDED

Context-aware suggestions run on DeepSeek using a key built into the extension, so there
is nothing to sign up for or paste in. The sentence before your cursor is sent only to
DeepSeek, and a switch in Settings turns that off entirely. If you have your own DeepSeek
key you can enter it and it will be used instead. With suggestions off, the library still
works in full.

Segue has no server, no analytics, and no tracking.
```

---

## Privacy tab

**Single purpose**
```
Segue helps you write by suggesting transition words and phrases that fit the sentence
you have just finished, and inserting the one you choose at your cursor.
```

**Permission justifications** — the full, field-ready text is in
`store-assets/PERMISSIONS.txt`. Summarised:

- **`storage`** — Stores the user's display preferences (theme, register, which phrase tiers are expanded, whether online suggestions are on) and an optional personal DeepSeek API key on their own device. Nothing is stored remotely.
- **`tabs`** — The side panel runs in a separate document from the page. It needs the active tab's id to ask that specific tab for the text around the cursor and to insert the chosen phrase back into it.
- **`scripting`** — When the extension updates, content scripts already running in open tabs are disconnected by Chrome. This permission re-injects them so the extension keeps working without the user manually reloading every tab.
- **`clipboardWrite`** — Some editors refuse programmatic insertion. In that case the chosen phrase is copied to the clipboard so the user can paste it themselves, rather than the click silently doing nothing.
- **`sidePanel`** — The extension's main interface is a Chrome side panel.
- **Host permission `https://api.deepseek.com/*`** — The only network destination. The sentence being written is sent there to generate suggestions, authenticated with the key built into the extension, or a personal key if the user entered one.
- **Content scripts on all sites** — Segue must work in whatever text box the user is writing in, which can be on any website. It only reads the field currently being edited, only reads the text immediately before the cursor, and sends that text nowhere if the user has switched online suggestions off.
- **Remote code** — **No.** All code ships inside the package. Verified: no `eval`, no
  `new Function`, no dynamic `import()` of a URL, and no remote script or stylesheet tag in
  any extension page. Calling the DeepSeek API is not remote code — the response is JSON,
  parsed as data and never executed. Answering "yes" here forces a deeper review and is
  inaccurate.

**Data usage disclosures** — tick these, then tick all three certification boxes:

| Category | Tick? | Why |
| --- | --- | --- |
| Personal communications | **Yes** | The text being written is sent to DeepSeek for suggestions |
| Authentication information | **Yes** | An optional personal API key is stored locally and sent to DeepSeek |
| Personally identifiable information | No | Never requested or transmitted |
| Health / financial / location / web history | No | Never touched |
| User activity | No | No clicks, analytics or behaviour are recorded |
| Website content | No | Only the field being edited is read, never page content at large |

Certifications to confirm: data is **not** sold to third parties; is **not** used for
purposes unrelated to the item's single purpose; is **not** used to determine
creditworthiness or for lending.

Read these yourself before ticking — you are the one certifying them.

---

## Assets

| Asset | Requirement | Status |
| --- | --- | --- |
| Icon | 128×128 PNG | ✅ `icons/128.png` |
| Screenshot | 1280×800 or 640×400, at least one, up to five | ✅ five, in `store-assets/screenshots/` |
| Small promo tile | 440×280 | Optional |
| Privacy policy URL | Publicly reachable | ✅ https://sussyswimmer.github.io/segue-transitions/ |

---

## Expect a slower review

Two things reliably attract a closer look, so submit with them in mind rather than being
surprised:

1. **Content scripts on all sites.** Broad host access always draws scrutiny. The
   justification above is the honest one — a writing aid cannot know in advance which
   site you will write on.
2. **User text sent to a third-party API.** This is why the privacy policy has to be
   accurate and reachable. Do not describe the extension as processing data "locally".

First reviews commonly take a few days and can take longer. If it is rejected, the email
names the exact policy section — send it to me and I'll fix it.

---

## Before you submit

The extension should be confirmed working end to end in your own browser first. As of
now, the content script was not injecting in your profile — worth resolving before
paying the fee and starting a review clock.
