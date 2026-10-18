# Chat Studio — editable chat mockup (PWA)

A mobile-first, offline-capable chat interface inspired by the supplied reference. This is a fictional mockup builder, not WhatsApp and not connected to any messaging account.

## Run locally

Because PWA service workers require localhost/HTTPS, use one of these options:

- **VS Code:** install the Live Server extension, right-click `index.html`, choose **Open with Live Server**.
- **Python:** from this folder run `python -m http.server 8000`, then open `http://localhost:8000` on your computer. On a phone, both devices must be on the same Wi-Fi and you should use your computer's local IP address.

Opening `index.html` directly works for basic preview, but install/offline features won't work reliably from `file://`.

## Features

- Incoming and outgoing messages; add, edit, delete and change sender side.
- Per-message date, time and delivery state (single tick, double tick, blue double tick, or none).
- Editable contact name, phone number, last-seen text and profile photo.
- Dark, plain, light, green, custom-color and image backgrounds.
- Toggle timestamps, date separators and composer; adjust text size.
- Local save, JSON export/import, responsive mobile layout and PWA install support.
- Service-worker cache for offline use after the first visit.

## GitHub Pages

1. Extract this ZIP.
2. Create a GitHub repository and upload the **contents** of this folder (keep `index.html` at repository root).
3. Go to **Settings → Pages** and choose **Deploy from a branch**, branch `main`, folder `/(root)`.
4. Wait for deployment and open the Pages URL over HTTPS. The relative `./` paths are compatible with project Pages URLs.

## Notes

- Browser storage is local to that browser/device. Use **Save locally** to save settings; export JSON to back up or move a setup.
- Large profile/background images can exceed browser local-storage limits. If saving fails, use smaller images or export settings.
- For full-screen mobile use, open the deployed HTTPS site in a supported browser and choose **Add to Home screen** / **Install app**.
- Use this for fictional mockups, design demos or storytelling. Don't use edited chats to misrepresent real conversations.
