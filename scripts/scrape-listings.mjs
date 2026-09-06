/**
 * Scrapes a Hideaways booking-engine listing index into JSON.
 *
 * The booking site renders listings client-side, so this drives a real
 * browser: it captures the JSON the page fetches for itself, then falls back
 * to reading the rendered DOM. Both sources are merged by listing id.
 *
 * Egress from the dev sandbox is proxy-blocked, so this is meant to run in
 * CI (.github/workflows/scrape-listings.yml) or on a machine with open
 * network access.
 *
 *   node scripts/scrape-listings.mjs --url <index-url> --out data/listings.json
 *
 * Flags:
 *   --url <url>        listing index to scrape (repeatable)
 *   --out <path>       where to write the merged JSON
 *   --details          also open each listing page for price/rating
 *   --debug-dir <dir>  dump raw HTML, screenshots and captured API payloads
 *   --timeout <ms>     per-navigation timeout (default 45000)
 *   --headed           run with a visible browser (local debugging)
 */

import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const DEFAULT_URL = 'https://book.thehideaways.co/all-listings?category=18580';

function parseArgs(argv) {
  const args = { urls: [], out: 'data/listings.json', details: false, debugDir: null, timeout: 45000, headed: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--url') args.urls.push(argv[++i]);
    else if (a === '--out') args.out = argv[++i];
    else if (a === '--debug-dir') args.debugDir = argv[++i];
    else if (a === '--timeout') args.timeout = Number(argv[++i]);
    else if (a === '--details') args.details = true;
    else if (a === '--headed') args.headed = true;
    else throw new Error(`Unknown flag: ${a}`);
  }
  if (!args.urls.length) args.urls.push(DEFAULT_URL);
  return args;
}

/** "The Boone - NEW Silo Cabin | Hot Tub" -> { name, tagline } */
function splitTitle(title) {
  const clean = (title || '').replace(/\s+/g, ' ').trim();
  const m = clean.match(/^(.*?)\s+[-–—]\s+(.*)$/);
  return m ? { name: m[1].trim(), tagline: m[2].trim() } : { name: clean, tagline: '' };
}

/** "1,015" -> 1015; anything unparseable -> undefined (never NaN). */
function toNum(raw) {
  if (raw === null || raw === undefined || raw === '') return undefined;
  const n = Number(String(raw).replace(/[,\s]/g, ''));
  return Number.isFinite(n) ? n : undefined;
}

/** Pull guests/bedrooms/rating/price out of a card's visible text. */
function parseFacts(text) {
  const t = (text || '').replace(/\s+/g, ' ');
  const num = re => { const m = t.match(re); return m ? toNum(m[1]) : undefined; };
  return {
    guests: num(/(\d+)\s*guests?/i),
    bedrooms: num(/(\d+)\s*bedrooms?/i),
    beds: num(/(\d+)\s*beds?(?!room)/i),
    bathrooms: num(/(\d+)\s*bath(?:room)?s?/i),
    // Ratings render as a glyph, an icon with bare text, or "N (x reviews)" —
    // never rely on the star surviving the page's encoding.
    rating: num(/(\d(?:\.\d+)?)\s*(?:★|☆|out of 5|stars?\b)/i)
      ?? num(/(\d\.\d+)\s*\(\s*\d+\s*reviews?\s*\)/i)
      ?? num(/rated\s*(\d(?:\.\d+)?)/i),
    reviews: num(/\(?\s*(\d+)\s*reviews?\s*\)?/i),
    price: num(/\$\s*([\d,]+(?:\.\d{2})?)/),
  };
}

function mergeListing(into, add) {
  const out = { ...into };
  for (const [k, v] of Object.entries(add)) {
    if (v === undefined || v === null || v === '' || (typeof v === 'number' && !Number.isFinite(v))) continue;
    if (out[k] === undefined || out[k] === null || out[k] === '') out[k] = v;
  }
  return out;
}

/** Walk any captured JSON looking for objects that smell like listings. */
function harvestJson(node, found = new Map(), depth = 0) {
  if (!node || depth > 8) return found;
  if (Array.isArray(node)) {
    for (const v of node) harvestJson(v, found, depth + 1);
    return found;
  }
  if (typeof node !== 'object') return found;

  const id = node.id ?? node.listingId ?? node.listingMapId;
  const title = node.name ?? node.title ?? node.internalListingName ?? node.publicName;
  if (id != null && typeof title === 'string' && title.length > 3) {
    const key = String(id);
    const { name, tagline } = splitTitle(title);
    found.set(key, mergeListing(found.get(key) ?? {}, {
      id: key,
      title,
      name,
      tagline,
      guests: toNum(node.personCapacity ?? node.guestsIncluded ?? node.accommodates ?? node.maxGuests),
      bedrooms: toNum(node.bedroomsNumber ?? node.bedrooms),
      beds: toNum(node.bedsNumber ?? node.beds),
      bathrooms: toNum(node.bathroomsNumber ?? node.bathrooms),
      rating: toNum(node.averageReviewRating ?? node.rating ?? node.starRating),
      reviews: toNum(node.reviewCount ?? node.numberOfReviews),
      price: toNum(node.price ?? node.basePrice ?? node.averageNightlyPrice ?? node.minPrice),
      currency: node.currency ?? node.currencyCode,
      city: node.city,
      state: node.state,
      image: node.thumbnailUrl ?? node.imageUrl ?? node.picture,
    }));
  }
  for (const v of Object.values(node)) harvestJson(v, found, depth + 1);
  return found;
}

/**
 * Nightly rates live at /listings/<id>/calendar, one entry per date — nothing
 * on the rendered page quotes a price. Reduce each calendar to a median plus a
 * range, which is what a "what would this cost" glance actually wants.
 */
function harvestCalendarPrices(captured) {
  const byId = new Map();
  for (const c of captured) {
    const m = c.url.match(/\/listings\/(\d+)\/calendar/);
    if (!m) continue;

    const days = [];
    (function walk(node, depth = 0) {
      if (!node || depth > 6) return;
      if (Array.isArray(node)) { node.forEach(v => walk(v, depth + 1)); return; }
      if (typeof node !== 'object') return;
      const price = toNum(node.price ?? node.basePrice);
      if (node.date && price) {
        days.push({ date: String(node.date), price, available: node.isAvailable ?? node.available ?? node.status });
      }
      for (const v of Object.values(node)) walk(v, depth + 1);
    })(c.body);
    if (!days.length) continue;

    // Calendars run two years out, so cut to a horizon worth planning against.
    // Two medians, because they answer different questions: every night in the
    // window is the cabin's typical rate, while the still-open nights are what
    // you would actually pay booking today — higher on popular cabins, whose
    // cheap off-peak nights are already taken.
    const horizon = new Date(Date.now() + 365 * 864e5).toISOString().slice(0, 10);
    const bookable = d =>
      d.available === undefined || d.available === 1 || d.available === true || d.available === 'available';

    const inHorizon = days.filter(d => d.date <= horizon);
    if (!inHorizon.length) continue;
    const open = inHorizon.filter(bookable);

    const median = list => {
      const p = list.map(d => d.price).sort((a, b) => a - b);
      const mid = Math.floor(p.length / 2);
      return p.length % 2 ? p[mid] : Math.round((p[mid - 1] + p[mid]) / 2);
    };
    const all = inHorizon.map(d => d.price).sort((a, b) => a - b);

    byId.set(m[1], {
      price: median(inHorizon),
      priceOpen: open.length >= 10 ? median(open) : undefined,
      priceMin: all[0],
      priceMax: all[all.length - 1],
      priceNights: inHorizon.length,
      priceOpenNights: open.length,
      priceBasis: 'median nightly rate over the next 12 months',
    });
  }
  return byId;
}

/** Read listing cards straight out of the rendered page. */
function extractFromDom() {
  const re = /\/listings\/(\d+)/;
  const byId = new Map();

  for (const a of document.querySelectorAll('a[href*="/listings/"]')) {
    const m = (a.getAttribute('href') || '').match(re);
    if (!m) continue;
    const id = m[1];

    // innerText, not textContent: textContent runs block elements together, so
    // a title ending "Sleeps 8" followed by "8 guests" reads as "Sleeps 88
    // guests" and parses as 88 people.
    const readText = el => (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim();

    // Climb to the card: the nearest ancestor that actually carries the facts.
    // Testing for the facts themselves rather than a text length, because a
    // long enough title alone clears any length threshold and stops the walk
    // at the anchor.
    const FACTS = /\d\s*(?:guests?|bedrooms?|beds?|bath)|\$\s*\d|reviews?/i;
    let card = a;
    for (let i = 0; i < 6 && card.parentElement; i++) {
      if (FACTS.test(readText(card))) break;
      card = card.parentElement;
    }

    const img = card.querySelector('img');
    const heading = card.querySelector('h1, h2, h3, h4, [class*="title" i], [class*="name" i]');
    const prev = byId.get(id);
    const text = readText(card);
    if (prev && prev.text.length >= text.length) continue;

    byId.set(id, {
      id,
      url: new URL(a.getAttribute('href'), location.origin).toString(),
      title: (heading?.textContent || a.getAttribute('title') || a.textContent || '').replace(/\s+/g, ' ').trim(),
      text,
      image: img?.getAttribute('src') || img?.getAttribute('data-src') || undefined,
    });
  }
  return [...byId.values()];
}

async function autoScroll(page) {
  let previous = -1;
  for (let i = 0; i < 25; i++) {
    const count = await page.locator('a[href*="/listings/"]').count();
    // Click a "load more" style button if the page uses one.
    const more = page.locator('button:has-text("more"), button:has-text("More"), [role="button"]:has-text("more")').first();
    if (await more.count() && await more.isVisible().catch(() => false)) {
      await more.click({ timeout: 3000 }).catch(() => {});
    }
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(900);
    if (count === previous && i > 3) break;
    previous = count;
  }
}

async function scrapeIndex(page, url, { timeout, captured }) {
  console.log(`→ ${url}`);
  const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout });
  console.log(`  status ${res?.status()}`);
  await page.waitForLoadState('networkidle', { timeout }).catch(() => {});
  await page.locator('a[href*="/listings/"]').first().waitFor({ timeout: 15000 }).catch(() => {});
  await autoScroll(page);

  const dom = await page.evaluate(extractFromDom);
  console.log(`  ${dom.length} listing links in the DOM`);

  const merged = new Map();
  for (const d of dom) {
    const { name, tagline } = splitTitle(d.title);
    // Drop the title before parsing: it carries its own numbers ("Sleeps 12")
    // that otherwise collide with the card's real guest/bedroom counts.
    const facts = parseFacts(d.title ? d.text.replace(d.title, ' ') : d.text);
    merged.set(d.id, { id: d.id, url: d.url, title: d.title, name, tagline, image: d.image, ...facts });
  }
  // Anything the page fetched for itself wins where the DOM was silent.
  for (const [id, fromApi] of harvestJson(captured)) {
    if (!merged.has(id)) continue; // only ids actually shown on this index
    merged.set(id, mergeListing(merged.get(id), fromApi));
  }
  return [...merged.values()];
}

async function scrapeDetail(context, listing, timeout) {
  const page = await context.newPage();
  try {
    await page.goto(listing.url, { waitUntil: 'domcontentloaded', timeout });
    await page.waitForLoadState('networkidle', { timeout }).catch(() => {});
    const text = await page.evaluate(() => document.body.innerText.replace(/\s+/g, ' ').slice(0, 4000));
    const title = await page.title();
    const facts = parseFacts(text);
    return mergeListing(listing, { ...facts, title: listing.title || title });
  } catch (e) {
    console.warn(`  ! detail failed for ${listing.name || listing.id}: ${e.message.split('\n')[0]}`);
    return listing;
  } finally {
    await page.close();
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const captured = [];

  const browser = await chromium.launch({
    headless: !args.headed,
    ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
  });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36',
    viewport: { width: 1440, height: 1000 },
  });

  // The booking engine fetches its own data; keep every JSON payload it pulls.
  context.on('response', async res => {
    const type = res.headers()['content-type'] || '';
    if (!type.includes('json')) return;
    try { captured.push({ url: res.url(), body: await res.json() }); } catch { /* not parseable */ }
  });

  const page = await context.newPage();
  const all = new Map();
  try {
    for (const url of args.urls) {
      for (const l of await scrapeIndex(page, url, { timeout: args.timeout, captured })) {
        all.set(l.id, mergeListing(all.get(l.id) ?? {}, l));
      }
      if (args.debugDir) {
        const slug = url.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').slice(-60);
        await mkdir(args.debugDir, { recursive: true });
        await writeFile(join(args.debugDir, `${slug}.html`), await page.content());
        await page.screenshot({ path: join(args.debugDir, `${slug}.png`), fullPage: true });
      }
    }

    if (args.details) {
      const listings = [...all.values()];
      console.log(`→ opening ${listings.length} listing pages for detail`);
      const queue = [...listings];
      await Promise.all(Array.from({ length: 3 }, async () => {
        for (let next = queue.shift(); next; next = queue.shift()) {
          all.set(next.id, await scrapeDetail(context, next, args.timeout));
        }
      }));
    }

    // Calendars are only fetched when a listing page is opened, so prices
    // require --details.
    const calendar = harvestCalendarPrices(captured);
    for (const [id, prices] of calendar) {
      if (all.has(id)) all.set(id, mergeListing(all.get(id), prices));
    }
    console.log(`\nnightly rates recovered for ${calendar.size} of ${all.size} listings`);

    if (args.debugDir) {
      await mkdir(args.debugDir, { recursive: true });
      await writeFile(join(args.debugDir, 'captured-json.json'), JSON.stringify(captured, null, 2));
    }

    // Endpoints the page called, and whether any of them mention a price.
    // Prices are not on the listing cards, so this is the trail to follow.
    const endpoints = new Map();
    for (const c of captured) {
      const key = c.url.split('?')[0];
      const priced = /"(?:price|basePrice|averageNightlyPrice|minPrice|total)"/.test(JSON.stringify(c.body));
      const seen = endpoints.get(key) ?? { hits: 0, priced: false };
      endpoints.set(key, { hits: seen.hits + 1, priced: seen.priced || priced });
    }
    console.log(`\nAPI endpoints called (${endpoints.size}):`);
    for (const [url, { hits, priced }] of endpoints) {
      console.log(`  ${priced ? '[has price fields]' : '[no price fields]'} x${hits} ${url}`);
    }
  } finally {
    await browser.close();
  }

  const listings = [...all.values()].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  const payload = { scrapedAt: new Date().toISOString(), sources: args.urls, count: listings.length, listings };

  await mkdir(dirname(args.out), { recursive: true });
  await writeFile(args.out, JSON.stringify(payload, null, 2) + '\n');
  console.log(`✓ wrote ${listings.length} listings to ${args.out}`);

  if (!listings.length) {
    console.error('No listings found — check the debug dir for what the page actually rendered.');
    process.exitCode = 1;
  }
}

main().catch(e => { console.error(e); process.exit(1); });
