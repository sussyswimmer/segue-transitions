# Store assets

`screenshot-1280x800.html` renders the Chrome Web Store screenshot at exactly the
required size: the side panel (loaded from the real `sidepanel.css` / `sidepanel.js`,
not a mock-up) beside a document with the inline pop-up open.

To regenerate the PNG:

```bash
cd store-assets && python -m http.server 8899
```

Open <http://localhost:8899/screenshot-1280x800.html>, size the window so the page is
1280x800, and capture it. In Chrome DevTools: Ctrl+Shift+P, then "Capture screenshot".

`preview-shim.js` stubs the `chrome.*` APIs and the DeepSeek response so the panel runs
as an ordinary web page. It is a development harness and never ships in the extension.
