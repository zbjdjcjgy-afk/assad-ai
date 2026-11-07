# ASSAD AI secure chat backend

1. Create a Cloudflare Worker and deploy `worker.js`.
2. In Worker **Settings → Variables and Secrets**, add:
   - `OPENAI_API_KEY` as a **Secret**.
   - `OPENAI_MODEL` as a model enabled for your API project (default in code: `gpt-6-astra`).
   - `ALLOWED_ORIGIN` as exactly `https://zbjdjcjgy-afk.github.io` (no trailing slash).
3. Copy the Worker URL. In the root `script.js`, replace the empty `ASSAD_API_URL` value with `https://YOUR-WORKER.workers.dev/api/chat`.
4. Commit `script.js` to GitHub Pages.
5. Test `https://YOUR-WORKER.workers.dev/health`; it should return `{ "ok": true }`.

**Security:** Never put your API key in HTML, CSS, JavaScript served to browsers, or a public repository. Add rate limiting, usage limits, abuse protection and monitoring before opening the chat to the public. This first version does not save conversations or provide user accounts.

**Billing:** ChatGPT subscriptions and API billing are separate. An API key and an API project with available billing/credits may be required.
