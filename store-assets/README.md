# Store assets

`screenshot-1280x800.html` renders the Chrome Web Store screenshots at exactly the
required size. `?n=1` through `?n=5` select the five scenes:

| n | Shows |
| --- | --- |
| 1 | The inline pop-up open at the cursor, with the panel alongside |
| 2 | The standing library, two situation filters active |
| 3 | Overuse flagging — the strip, and the struck-out chip it explains |
| 4 | The Signposts bank |
| 5 | Settings: the DeepSeek switch, and the key field left empty |

The rendered PNGs are committed in `screenshots/`.

The side panel in every shot is the real thing, loaded from the actual `sidepanel.css`
and `sidepanel.js`. Only the host document and the inline pop-up are mocked, and the
pop-up mock is kept in step with `POPUP_CSS` in `content.js` by hand.

To regenerate:

```bash
python -m http.server 8899          # from the repository root
```

Open <http://localhost:8899/store-assets/screenshot-1280x800.html?n=1>, size the window
so the page is 1280x800, and capture it. In Chrome DevTools: Ctrl+Shift+P, then
"Capture screenshot". Repeat for `n=2` … `n=5`.

`preview-shim.js` stubs the `chrome.*` APIs and the DeepSeek response so the panel runs
as an ordinary web page, and varies the sample passage per scene. Its `sk-preview` is a
placeholder string, not a key. It is a development harness and never ships in the
extension: the packaged zip contains only the runtime files listed in `README.md`.
