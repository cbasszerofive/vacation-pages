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
