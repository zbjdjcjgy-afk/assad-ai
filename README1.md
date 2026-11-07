# ASSAD AI — Version 2

A cleaner mobile-first Arabic-first interface with Arabic, English and French language switching, an assistant chat layout, example prompts and a secure API-ready backend.

## Website
GitHub Pages serves the static frontend from the repository root.

## Files
- `index.html`, `style.css`, `script.js`: website frontend
- `assets/logo.svg`: brand mark
- `backend/worker.js`: Cloudflare Worker API gateway
- `backend/README.md`: backend deployment instructions

The chat interface is ready, but live AI replies require deploying the Worker, setting server-side secrets and adding its URL to `ASSAD_API_URL` in `script.js`. Never place API keys in frontend files.

This prototype does not yet include accounts, saved conversations, database storage, payment handling, or autonomous agents.
