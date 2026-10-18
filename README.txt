PWA-only patch for Chat Studio

Replace ONLY these files in your existing project root:
- manifest.json
- sw.js
- Add icon-192.png
- Add icon-512.png

Do not replace index.html, styles.css, or app.js. Your custom edits remain untouched.
After uploading to GitHub Pages, wait for deployment. On Android, remove the old home-screen shortcut, open the site in Chrome, reload it, then use Chrome menu > Install app / Add to Home screen again. If the old version persists, clear site data for the GitHub Pages site and revisit.
