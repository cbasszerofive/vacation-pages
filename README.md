# Three Oaks Trip Planner

A mobile-friendly trip planner for the Three Oaks / Harbor Country area of SW Michigan.

Built with React + Vite. Auto-deploys to GitHub Pages on push to `main`.

## Local dev

```bash
npm install
npm run dev
```

## Deploy

Push to `main` — GitHub Actions handles the rest.

## Scraping listing data

`scripts/scrape-listings.mjs` drives headless Chromium (Playwright) over a
booking-engine listing index and writes normalized JSON: name, tagline,
guests, bedrooms, beds, bathrooms, rating, review count, price and listing
URL, keyed by listing id.

The booking site renders client-side, so the scraper reads two sources and
merges them — every JSON payload the page fetches for itself, plus the
rendered DOM — which keeps it working when either one changes shape.

```bash
npm run scrape -- --url "https://book.thehideaways.co/all-listings?category=18580" \
                  --out data/hideaways-rrg.json \
                  --details --debug-dir scrape-debug
```

| Flag | Effect |
| --- | --- |
| `--url` | Listing index to scrape; repeat for several |
| `--out` | Output JSON path |
| `--details` | Also open each listing page (slower, better price/rating coverage) |
| `--debug-dir` | Dump page HTML, a full-page screenshot and captured API payloads |
| `--headed` | Watch it run in a real browser window |

### In CI

`.github/workflows/scrape-listings.yml` runs the same script on a GitHub
runner. Trigger it from the Actions tab, call it from another workflow
(`uses: ./.github/workflows/scrape-listings.yml`), or leave it to the monthly
schedule. Inputs: `url`, `out`, `details`, `commit` — set `commit: true` to
push the refreshed JSON back to the branch. Each run posts a table of what it
found to the job summary and uploads two artifacts: the JSON, and a debug
bundle to read when selectors stop matching.

Note that scraping needs open network access. Claude Code web sessions run
behind an egress proxy that blocks these hosts, so run it in CI or locally.

## Saved ticks (optional Firebase sync)

The bucket list page lets you tick off places you've been. With no setup those
ticks live in `localStorage` — private to one browser. Configure Firebase and
they move to a single shared list that both of you see, with each tick
recording who made it.

The page works either way: if the config is absent it silently stays in local
mode, and the Firebase SDK is dynamically imported so its weight never lands on
visitors who aren't syncing.

### One-time setup

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. **Authentication → Sign-in method →** enable **Google**.
3. **Authentication → Settings → Authorized domains →** add
   `cbasszerofive.github.io` (and `localhost` for local dev).
4. **Firestore Database →** create a database in production mode.
5. **Firestore → Rules →** paste `firestore.rules` from this repo, replacing the
   two placeholder addresses with the Google accounts that should have access.
6. **Project settings → Your apps → Web app →** register one and copy the config.
7. Add four repository secrets (**Settings → Secrets and variables → Actions**):

   | Secret | From the config object |
   | --- | --- |
   | `VITE_FIREBASE_API_KEY` | `apiKey` |
   | `VITE_FIREBASE_AUTH_DOMAIN` | `authDomain` |
   | `VITE_FIREBASE_PROJECT_ID` | `projectId` |
   | `VITE_FIREBASE_APP_ID` | `appId` |

8. Re-run the deploy (push to `main`, or run the workflow by hand).

These values are public identifiers, not credentials — they ship in the
JavaScript bundle by design. What keeps the list private is `firestore.rules`,
which is why step 5 matters: without the email allowlist, anyone with a Google
account could read and edit your list.

For local development, put the same four values in a `.env.local` file
(git-ignored) as `VITE_FIREBASE_API_KEY=...` and so on.
