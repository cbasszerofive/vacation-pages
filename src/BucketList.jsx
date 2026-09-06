import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import scraped from '../data/hideaways-rrg.json';

const BG = '#10140f';
const CARD_BG = '#1a1f18';
const CARD_BORDER = 'rgba(255,255,255,0.07)';
const ACCENT = '#e0a03c';
const ACCENT_DIM = 'rgba(224,160,60,0.13)';
const ACCENT_BORDER = 'rgba(224,160,60,0.35)';
const TEXT = '#eae8e2';
const MUTED = 'rgba(234,232,226,0.52)';

// The Hideaways’ Red River Gorge collection — 23 cabins.
const rrgCabins = [
  {
    name: 'Rockface Retreat',
    tagline: '75′ High Cliffside Cabin · Panoramic Views · Hot Tub · Steam Shower',
    guests: 3, beds: 1, baths: 1, rating: 5.0, hotTub: true, tags: ['Couples'],
    note: 'Built 75 feet into a Gorge cliff and lit up at golden hour. The wrap-around deck slips under the cliff to a private hot tub framed by nothing but trees — no one can see in. “What really sets this place apart is the wow factor,” one guest wrote.',
    id: '422804',
    href: 'https://book.thehideaways.co/listings/422804',
    star: true,
    reviews: 52,
  },
  {
    name: 'The Naturalist',
    tagline: 'Kentucky’s Best Hot Tub Feature · Sleeps 4 · Dogs',
    guests: 4, beds: 2, baths: 1, rating: 5.0, hotTub: true, tags: ['Couples'],
    note: 'An A-frame tucked against a towering rock face at the end of a quiet gravel drive, boulders on every side. The hot tub sits framed by cliff walls and string lights — “so romantic and peaceful,” per one guest.',
    id: '193191',
    href: 'https://book.thehideaways.co/listings/193191',
    star: true,
    reviews: 61,
  },
  {
    name: 'The Taoist',
    tagline: 'Stargazing · Pet Friendly · Sleeps 4 · Fire Pit',
    guests: 4, beds: 2, baths: 1, rating: 5.0, hotTub: false, tags: ['Couples'],
    note: 'A glass front rising straight out of a 50-ft limestone cliff, with a fire pit and Adirondack chairs waiting below. Inside, a loft looks down over the sectional and a neon sign glowing above the TV.',
    id: '192551',
    href: 'https://book.thehideaways.co/listings/192551',
    access: '4WD/AWD required',
    reviews: 55,
  },
  {
    name: 'The Onyx',
    tagline: 'Sauna · Hot Tub · Telescope · Honeymoon Vibes',
    guests: 2, beds: 1, baths: 1, rating: 5.0, hotTub: true, tags: ['Couples'],
    note: 'A modern black cabin with a barrel sauna steps from the door and a telescope for the Kentucky night sky. Wall-to-wall glass, a kitchen in warm wood and deep green, and a retro orange fridge.',
    star: true,
    id: '537238',
    href: 'https://book.thehideaways.co/listings/537238',
    reviews: 10,
  },
  {
    name: 'The Stoic',
    tagline: 'Boulder Mounted Hot Tub · Sleeps 4 · Romantic Stay',
    guests: 4, beds: 2, baths: 1, rating: 5.0, hotTub: true, tags: ['Couples'],
    note: 'Off-grid stillness under a starlit Gorge sky. The boulder-top hot tub — string lights on as the evening cools — is the most-loved feature here, hands down.',
    id: '193193',
    href: 'https://book.thehideaways.co/listings/193193',
    access: '4WD/AWD required',
    reviews: 59,
  },
  {
    name: 'Tunnelvision',
    tagline: 'Private · Hot Tub · Arch Views · Sleeps 2 · Pet Friendly',
    guests: 2, beds: 1, baths: 1, rating: 5.0, hotTub: true, tags: ['Couples'],
    note: 'Alone on a private ridge inside the Gorge Geological Area, two minutes from Nada Tunnel. Lofted queen and an oversize sofa, with a hot tub, fire pit, hammocks, and a charcoal grill outside.',
    id: '566851',
    href: 'https://book.thehideaways.co/listings/566851',
    reviews: 2,
  },
  {
    name: 'The Blackstone',
    tagline: 'Hot Tub · Outdoor Dining · Sleeps 4 · Minutes to RRG',
    guests: 4, beds: 2, baths: 2, rating: 5.0, hotTub: true, tags: ['Couples'],
    note: 'Hidden down its own gravel drive for total privacy on arrival. Golden-hour soaking in the private hot tub with treetops turning gold all around.',
    id: '559456',
    href: 'https://book.thehideaways.co/listings/559456',
    access: 'No 4WD needed',
    reviews: 6,
  },
  {
    name: 'Drop Red Gorgeous',
    tagline: 'New Design & Furniture · Hot Tub · Pet Friendly · Sleeps 4',
    guests: 4, beds: 2, baths: 2, rating: 5.0, hotTub: true, tags: ['Couples'],
    note: 'Modern cedar and glass tucked into the canopy, up wood steps to string-lit evenings on the deck. Sliding glass walls open the dining table straight onto the forest.',
    id: '428435',
    href: 'https://book.thehideaways.co/listings/428435',
    access: '4WD/AWD required',
    reviews: 14,
  },
  {
    name: 'Limestone Ridge',
    tagline: 'Rare Cliffside Views · Hot Tub · Fire Pit · Sleeps 6',
    guests: 6, beds: 2, baths: 2, rating: 5.0, hotTub: true, tags: ['Couples'],
    note: 'A modern A-frame on just under an acre, looking over the Pendegress-Murray reserve and facing the Motherlode climbing area. Coffee on the porch swing, hot tub under the stars.',
    id: '499137',
    href: 'https://book.thehideaways.co/listings/499137',
    reviews: 12,
  },
  {
    name: 'Hidden Cave Cottage',
    tagline: 'Cozy Cottage · Hot Tub · Game Room · Cave Fire Pit',
    guests: 8, beds: 3, baths: 2, hotTub: true, tags: ['Couples'],
    note: 'A cottage with its own cave fire pit and a game room — the rare Hideaway that sleeps eight but still reads cozy.',
    id: '585094',
    href: 'https://book.thehideaways.co/listings/585094',
  },
  {
    name: 'Moonlight Ridge',
    tagline: 'Private Mountain Top Escape · Sleeps 3 · Fire Pit · Modern Cabin',
    guests: 3, beds: 1, baths: 1, rating: 4.95, hotTub: false, tags: ['Couples'],
    note: 'Glows at dusk with a string-lit staircase up from the gravel drive. Vaulted wood ceilings and floor-to-ceiling windows, sliding doors straight onto the deck.',
    id: '388260',
    href: 'https://book.thehideaways.co/listings/388260',
    reviews: 20,
  },
  {
    name: 'Cooper Pines',
    tagline: 'Cozy RRG A-frame · Hot Tub · Forest View · Fire Pit',
    guests: 8, beds: 3, baths: 2, rating: 5.0, hotTub: true, tags: ['Couples', 'Family'],
    note: 'A glowing A-frame with string lights already lit and three bedrooms stacked across three levels. The deck hot tub is framed by forest on every side.',
    id: '278018',
    href: 'https://book.thehideaways.co/listings/278018',
    reviews: 40,
  },
  {
    name: 'Shawnee Retreat',
    tagline: 'Best Views in RRG · Hot Tub · Arcade · Sleeps 12 · Cave & Waterfall',
    guests: 12, beds: 6, baths: 6, rating: 5.0, hotTub: true, tags: ['Family'],
    note: 'Billed as one of the best views in all of Kentucky, near Frenchburg, with a cave and waterfall on the property. The game room runs foosball, a retro arcade, and a PS5.',
    star: true,
    id: '345991',
    href: 'https://book.thehideaways.co/listings/345991',
    reviews: 21,
  },
  {
    name: 'The Sentinel',
    tagline: 'Pickleball Court · Theater · Hot Tub · Sleeps 14',
    guests: 14, beds: 4, baths: 5, rating: 5.0, hotTub: true, tags: ['Family'],
    note: 'A grand log cabin ringed by trees — the biggest in the collection. Indoor rec space with pickleball, ping pong, and pool, plus a theater room.',
    id: '499126',
    href: 'https://book.thehideaways.co/listings/499126',
    reviews: 1,
  },
  {
    name: 'Greywood Reserve',
    tagline: 'Nerf Blasters · Hot Tub · Mural · Arcade · Sunset',
    guests: 12, beds: 4, baths: 4, rating: 5.0, hotTub: true, tags: ['Family'],
    note: 'A big-group cabin with a covered hot tub looking at the mountains, an arcade, a mural, and Nerf blasters in the closet. Fire pit at sunset.',
    id: '537240',
    href: 'https://book.thehideaways.co/listings/537240',
    reviews: 3,
  },
  {
    name: 'Pond Paradise',
    tagline: 'Hot Tub · Off-Road Parks · Private Fishing Pond · Sleeps 7',
    guests: 7, beds: 2, baths: 2, rating: 5.0, hotTub: true, tags: ['Family'],
    note: 'Seven acres of open lawn, a private fishing pond, and a covered daybed swing on the porch. “We have rented a dozen or more cabins around the gorge and this one hands down is the best!” — Steve',
    id: '384086',
    href: 'https://book.thehideaways.co/listings/384086',
    reviews: 19,
  },
  {
    name: 'The Russet',
    tagline: 'Family Cabin · Hot Tub · Kid Games · King Bed · Sleeps 8',
    guests: 8, beds: 3, baths: 2, rating: 5.0, hotTub: true, tags: ['Family'],
    note: 'A quiet wooded lot with a big deck and a warm, cabin-cozy king primary. Kid games inside for the in-between hours.',
    id: '250135',
    href: 'https://book.thehideaways.co/listings/250135',
    reviews: 40,
  },
  {
    name: 'The Boone',
    tagline: 'New Silo Cabin · Sleeps 4 · Hot Tub · Trailer Parking · Near Food & Trails',
    guests: 4, beds: 2, baths: 2, rating: 5.0, hotTub: true, tags: ['Silos', 'Couples'],
    note: 'The only double-silo in the collection, twin towers rising out of blazing fall color. Vaulted beams meet the curved wall over a navy island, and off-road trails for Jeeps and side-by-sides run from the door.',
    star: true,
    id: '432482',
    href: 'https://book.thehideaways.co/listings/432482',
    reviews: 21,
  },
  {
    name: 'The Yoder',
    tagline: 'Romantic Silo Escape · Sleeps 2 · Hot Tub · String Light Foot Bridge',
    guests: 2, beds: 1, baths: 1, rating: 5.0, hotTub: true, tags: ['Silos', 'Couples'],
    note: 'A string-lit wooden boardwalk winds through the forest to the door. The king bedroom is a sanctuary — vaulted wood-beam ceiling, one oversized window pulling the forest inside.',
    id: '483164',
    href: 'https://book.thehideaways.co/listings/483164',
    reviews: 9,
  },
  {
    name: 'The Rock Haus',
    tagline: 'Unique Silo House · Hot Tub · King Beds · Sleeps 6 · SxS Trails',
    guests: 6, beds: 3, baths: 2, rating: 5.0, hotTub: true, tags: ['Silos', 'Family'],
    note: 'A bold primary suite under a vaulted silo ceiling, king bed and sofa nook. The hot tub hides behind a privacy wall on the wraparound deck. Side-by-side trails from the door.',
    id: '433008',
    href: 'https://book.thehideaways.co/listings/433008',
    reviews: 10,
  },
  {
    name: 'The Holler',
    tagline: 'Unique Silo Cabin · Hot Tub · Sleeps 6 · 3 King Beds · Trailer Space',
    guests: 6, beds: 3, baths: 2, rating: 5.0, hotTub: true, tags: ['Silos', 'Family'],
    note: 'Three king beds and an open floor plan under vaulted ceilings, with a wraparound deck backing onto a creek — room for the whole group’s gear.',
    id: '412842',
    href: 'https://book.thehideaways.co/listings/412842',
    reviews: 8,
  },
  {
    name: 'The Derby',
    tagline: 'Private Fire Pit · Outdoor Games · Hot Tub · King Bed · Trailer Parking',
    guests: 8, beds: 3, baths: 2, rating: 5.0, hotTub: true, tags: ['Silos', 'Family'],
    note: 'Kentucky Derby-inspired, with a 50-foot wraparound deck that puts you in the trees — hot tub on one side, yard games and Adirondack chairs for the rest of the crew.',
    id: '468985',
    href: 'https://book.thehideaways.co/listings/468985',
    reviews: 8,
  },
  {
    name: 'The Still',
    tagline: 'Unique Silo Cabin · King Bed · Private Hot Tub · Fire Pit · Trailer Friendly',
    guests: 8, beds: 3, baths: 2, rating: 4.95, hotTub: true, tags: ['Silos', 'Family'],
    note: 'A bourbon-inspired silo with a creek view and a black silhouette above its 50-foot wraparound deck — Adirondack chairs, hot tub, and grill all staged, string lights on the privacy wall.',
    id: '389090',
    href: 'https://book.thehideaways.co/listings/389090',
    reviews: 14,
  },
];

// Capacities, ratings and nightly rates come from the scrape workflow
// (data/hideaways-rrg.json, refreshed monthly); the prose, tags and access
// notes above are editorial. Anything the scrape has not seen falls back to
// the hand-entered value, so a stale or partial file degrades quietly.
const scrapedById = Object.fromEntries(scraped.listings.map(l => [l.id, l]));

const rrgCabinsLive = rrgCabins.map(c => {
  const live = scrapedById[c.id] ?? {};
  return {
    ...c,
    guests: live.guests ?? c.guests,
    beds: live.bedrooms ?? c.beds,
    baths: live.bathrooms ?? c.baths,
    rating: live.rating ?? c.rating,
    reviews: live.reviews ?? c.reviews,
    href: live.url ?? c.href,
    price: live.price,
    priceMin: live.priceMin,
    priceMax: live.priceMax,
  };
});

const scrapedOn = new Date(scraped.scrapedAt).toLocaleDateString('en-US', {
  month: 'long', day: 'numeric', year: 'numeric',
});


// Hideaway on the Hocking — nine units on the Hayes family farm. No booking
// engine we can read, so these are hand-entered from the property's own pages.
const hockingUnits = [
  {
    name: 'The Bridge',
    tagline: 'Riverfront glass retreat',
    tags: ['Glass retreat'],
    note: 'One of three glass-fronted retreats set along the Hocking River — the whole front wall is the view.',
    href: 'https://hideawayonthehocking.com/rentals/the-bridge/',
    star: true,
    areas: ['River'],
  },
  {
    name: 'The Falls',
    tagline: 'Riverfront glass retreat',
    tags: ['Glass retreat'],
    note: 'Glass-front retreat on the river, named for the water it looks onto.',
    href: 'https://hideawayonthehocking.com/rentals/the-falls/',
    star: true,
    areas: ['River'],
  },
  {
    name: 'The Mill',
    tagline: 'Riverfront glass retreat',
    tags: ['Glass retreat'],
    note: 'The third of the river retreats — same glass wall, its own stretch of bank.',
    href: 'https://hideawayonthehocking.com/rentals/the-mill/',
    areas: ['River'],
  },
  {
    name: 'The Little Red Caboose',
    tagline: 'Converted train caboose · Sleeps 2–4',
    tags: ['Caboose'],
    note: 'A real caboose with a covered porch, private fire pit and full bath. Wifi, smart TV and A/C inside the steel shell.',
    href: 'https://hideawayonthehocking.com/rentals/the-little-red-caboose/',
    star: true,
  },
  {
    name: 'The Little Blue Caboose',
    tagline: 'Converted train caboose · Sleeps 2–4',
    tags: ['Caboose'],
    note: 'Same footprint as its siblings — porch, fire pit, full bath — in blue.',
    href: 'https://hideawayonthehocking.com/rentals/the-little-blue-caboose/',
  },
  {
    name: 'The Little Green Caboose',
    tagline: 'Converted train caboose · Sleeps 2–4',
    tags: ['Caboose'],
    note: 'Covered porch and a fire pit of its own, tucked into the farm.',
    href: 'https://hideawayonthehocking.com/rentals/the-little-green-caboose/',
  },
  {
    name: 'The Little Yellow Caboose',
    tagline: 'Converted train caboose · Sleeps 2–4',
    tags: ['Caboose'],
    note: 'The yellow one. Porch, fire pit, full bath, and the quiet of 400 acres.',
    href: 'https://hideawayonthehocking.com/rentals/the-little-yellow-caboose/',
  },
  {
    name: 'The Little Brown Caboose',
    tagline: 'Converted train caboose · Sleeps 4 · Dogs',
    guests: 4,
    tags: ['Caboose'],
    note: 'Open floor plan sleeping four, with a covered porch and private fire pit looking out at the Hocking River, fields of sunflowers in season, or the Sanctuary Pond. Dogs over nine months welcome — $75 per stay, up to two, with a bed, bowl and towel provided.',
    href: 'https://hideawayonthehocking.com/rentals/the-little-brown-caboose/',
    areas: ['River', 'Sanctuary Pond', 'Fields'],
  },
  {
    name: 'The 1890 Depot',
    tagline: 'The original train station',
    tags: ['Depot'],
    note: 'The farm’s original 1890 train depot, restored and rentable — the piece of the property everything else is themed around.',
    href: 'https://hideawayonthehocking.com/rentals/',
  },
];


// What is on the land, as opposed to where you sleep. `area` is what ties an
// attraction to the stays near it — see the note on hockingUnits.
const hockingAttractions = [
  {
    name: 'The Quarry',
    kind: 'Pavilion',
    area: 'Sanctuary Pond',
    note: 'The 3,500 sq ft gathering pavilion, built around a 13-foot-wide, 20-foot-high indoor-outdoor stone fireplace. Teak tables for family-style dinners, leather sofas around the hearth, and the Sanctuary Pond beyond the glass.',
    href: 'https://hideawayonthehocking.com/destination/the-quarry/',
  },
  {
    name: 'The Sanctuary Pond',
    kind: 'Water',
    area: 'Sanctuary Pond',
    note: 'Egrets, mallards and blue heron are regulars; bluegill year-round, with yellow perch and largemouth bass by spring. Cast a line, walk the path around it, or sit on one of the cushioned boulders at the edge.',
  },
  {
    name: 'The Summit Hideout',
    kind: 'Lookout',
    area: 'The Summit',
    note: 'A 100 sq ft wooden lean-to at one of the highest points on the farm, kitted out with loungers, nature books and binoculars. Two miles up the Summit Loop to a panorama of the Southeast Ohio foothills.',
    href: 'https://hideawayonthehocking.com/destination/the-summit-hideout/',
  },
  {
    name: 'The Angler Hideout',
    kind: 'Hideout',
    area: 'Farm Pond',
    note: 'A hammock and a picnic table on the edge of the Ol’ Hayes Farm Pond, under towering pines. The quiet counterpart to the Summit climb.',
  },
  {
    name: 'Kayak float on the Hocking',
    kind: 'Water',
    area: 'River',
    note: 'A two-mile float along the Hayes family farm, past crops, sand bars and trees, with put-in access on the property.',
  },
  {
    name: 'Eagle’s Path Trail',
    kind: 'Trail',
    area: 'Trails',
    note: 'One of five private trails, which run from a half-mile stroll along the river’s edge up to the climb to the Summit.',
    href: 'https://hideawayonthehocking.com/destination/eagles-path-trail/',
  },
  {
    name: 'The U-pick garden',
    kind: 'Farm',
    area: 'Fields',
    note: 'Seasonal picking on a working farm — corn and tomatoes in summer, pumpkins and sunflowers into the fall.',
  },
  {
    name: 'The Happily Ever After Hideout',
    kind: 'Hideout',
    note: 'A named spot on the property I could only find by title — worth asking about if you are marking an occasion.',
    href: 'https://hideawayonthehocking.com/destination/the-happily-ever-after-hideout/',
  },
];

const items = [
  {
    id: 'rrg',
    name: 'The Hideaways',
    emoji: '🧗',
    tagline: 'Cliffside cabins, silos and A-frames in the Red River Gorge',
    location: 'Red River Gorge · Eastern Kentucky',
    type: '23 cabins in the collection',
    drive: '~5 hr from Cleveland',
    season: 'Best in October — peak foliage in the Gorge',
    status: 'Dreaming',
    gradient: 'linear-gradient(160deg, #2c3a24 0%, #10140f 100%)',
    why: 'The Red River Gorge is a canyon system inside Daniel Boone National Forest — sandstone cliffs, more than 100 natural arches, and some of the best sport climbing in the world. The Hideaways is a collection of design-forward cabins scattered through it: cliff-mounted glass boxes, converted grain silos, A-frames on private gravel drives. Every one is placed for privacy, and nearly every one has its own hot tub.',
    highlights: [
      { icon: '♨️', label: 'A hot tub with a view', detail: 'All but two of the 23 have a private hot tub — boulder-mounted, cliff-tucked, or behind a privacy wall on a wraparound deck.' },
      { icon: '🌾', label: 'The silo cabins', detail: 'Six are built from grain silos — curved walls, vaulted wood-beam ceilings, and a footbridge or boardwalk to the door.' },
      { icon: '⭐', label: 'Nearly perfect reviews', detail: 'Every cabin in the Gorge collection rates 4.95 or 5.00. Not one weak listing in the set.' },
      { icon: '👥', label: 'Two to fourteen', detail: 'The Yoder and The Onyx sleep two; The Sentinel sleeps fourteen with a pickleball court and a theater. Same collection, either trip.' },
    ],
    nearby: [
      'Trailheads for the Gorge’s best-known hikes — Natural Bridge, Sky Bridge, Gray’s Arch, Auxier Ridge — are minutes away.',
      'Off-road and side-by-side parks, with several cabins offering trailer parking.',
      'Local restaurants in the Campton / Slade / Rogers area.',
    ],
    booking: 'Listed on Airbnb and VRBO, but booking direct through their site is the cheapest option — worth comparing before locking anything in. Every card links straight to its direct-booking listing. Nightly rates are the median across the next twelve months, so they smooth over holidays and midweek dips rather than quoting any one date; the range beside each shows how far a given night can swing. The Hideaways also run 5 cabins in Hocking Hills, OH and 1 in Blue Ridge, GA.',
    links: [
      { label: 'Red River Gorge page', href: 'https://thehideaways.co/redrivergorge' },
      { label: 'All 23 cabins', href: 'https://thehideaways.co/red-river-gorge-cabins' },
      { label: 'Book direct', href: 'https://book.thehideaways.co' },
      { label: 'Maps', href: 'https://www.google.com/maps/search/?api=1&query=Red+River+Gorge+Kentucky' },
    ],
    cabins: rrgCabinsLive,
  },
  {
    id: 'hocking',
    name: 'Hideaway on the Hocking',
    emoji: '🚂',
    tagline: 'Train cabooses and glass river retreats on a 147-year-old farm',
    location: 'Guysville · Southeast Ohio',
    type: '9 units on 400 acres',
    drive: '~3.5 hr from Cleveland',
    season: 'Fall for color, summer for the river',
    status: 'Dreaming',
    gradient: 'linear-gradient(160deg, #24312c 0%, #10140f 100%)',
    why: 'Five train cabooses, three glass-fronted river retreats and the original 1890 depot, spread across 400 private acres of the Hayes family farm along the Hocking River. It is the opposite of the Gorge trip: no cliffs to climb, no 4WD drive in — just a working farm that has been in one family for 147 years, with a river running through it and somewhere very odd to sleep.',
    highlights: [
      { icon: '🚃', label: 'Sleeping in a caboose', detail: 'Five real cabooses, each with a covered porch, private fire pit and full bath, and modern comforts inside — wifi, smart TV, A/C. They sleep two to four apiece, nineteen between them.' },
      { icon: '🪟', label: 'Glass on the river', detail: 'The Bridge, The Falls and The Mill are glass-fronted retreats set on the riverbank, where the front wall is the whole point.' },
      { icon: '🥾', label: 'The land', detail: 'Five private hiking trails, ponds including the Sanctuary Pond, river and pond fishing, kayak access on the Hocking, and a seasonal U-pick garden.' },
      { icon: '🔥', label: 'A 3,200 sq ft pavilion', detail: 'Double-sided fireplace and sofas — the gathering space that makes this work for a group rather than just a couple.' },
      { icon: '🍽️', label: 'Dinner and a concert', detail: 'Chef Katie of River Willow Culinary runs a five-course seasonal menu on the property, and guests can book a private concert from a Southeast Ohio musician. Both are worth planning the trip around.' },
    ],
    nearby: [
      'The farm itself is the destination — trails, ponds and river access without leaving the property.',
      'Under three hours from Cincinnati; Athens and Ohio University are the nearest town of any size.',
      'Marketed as Hocking Hills, but Guysville sits southeast of the state park proper — worth checking the drive to Old Man’s Cave before planning around it.',
    ],
    booking: 'Book direct through their site; there is no third-party listing engine behind it, and no public nightly rates, so the availability page or a call to (740) 764-4684 is the only way to price a date. That also means the scrape workflow cannot read this one — the figures above are hand-entered from the property’s own pages, not refreshed monthly like the Red River Gorge cabins.',
    links: [
      { label: 'Website', href: 'https://hideawayonthehocking.com/' },
      { label: 'Availability', href: 'https://hideawayonthehocking.com/availability/' },
      { label: 'Experiences', href: 'https://hideawayonthehocking.com/experiences/' },
      { label: 'Maps', href: 'https://www.google.com/maps/search/?api=1&query=20750+River+Road+Guysville+OH+45735' },
    ],
    cabins: hockingUnits,
    attractions: hockingAttractions,
  },
];

const TAG_ICONS = {
  Couples: '💑', Family: '👨‍👩‍👧', Silos: '🌾',
  Caboose: '🚃', 'Glass retreat': '🪟', Depot: '🚉',
};

/**
 * Filters are derived from whichever tags a property's units actually carry,
 * so a collection of silo cabins and a farm of train cabooses each get a
 * sensible row instead of one hardcoded to the first property added.
 */
function filtersFor(units) {
  const tags = [...new Set(units.flatMap(u => u.tags ?? []))];
  return [
    { key: 'all', label: 'All', match: () => true },
    ...tags.map(tag => ({
      key: tag.toLowerCase().replace(/\s+/g, '-'),
      label: `${TAG_ICONS[tag] ?? '·'} ${tag}`,
      match: u => u.tags?.includes(tag),
    })),
    ...(units.some(u => u.hotTub) ? [{ key: 'hottub', label: '♨️ Hot tub', match: u => u.hotTub }] : []),
    ...(units.some(u => u.guests >= 8) ? [{ key: 'big', label: '🎉 Sleeps 8+', match: u => u.guests >= 8 }] : []),
  ];
}

function Chip({ children }) {
  return (
    <span style={{ fontSize: 12, color: TEXT, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '4px 11px' }}>
      {children}
    </span>
  );
}

function CabinCard({ cabin }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${cabin.star ? ACCENT_BORDER : CARD_BORDER}`,
      borderRadius: 12, padding: '13px 14px 12px',
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: cabin.star ? ACCENT : TEXT, flex: 1, lineHeight: 1.25 }}>
          {cabin.name}
        </span>
        {cabin.rating && (
          <span style={{ fontSize: 12, color: MUTED, whiteSpace: 'nowrap' }}>
            {cabin.rating.toFixed(2)} ★{cabin.reviews ? ` · ${cabin.reviews}` : ''}
          </span>
        )}
      </div>

      <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.4 }}>{cabin.tagline}</div>

      <div style={{ display: 'flex', gap: 10, fontSize: 12, color: TEXT, opacity: 0.85, flexWrap: 'wrap' }}>
        {cabin.guests && <span>👥 {cabin.guests}</span>}
        {cabin.beds && <span>🛏️ {cabin.beds}</span>}
        {cabin.baths && <span>🚿 {cabin.baths}</span>}
        {cabin.hotTub && <span>♨️ Hot tub</span>}
        {cabin.access && (
          <span style={{ color: cabin.access.startsWith('4WD') ? ACCENT : MUTED }}>
            🚙 {cabin.access}
          </span>
        )}
      </div>

      {cabin.price && (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: TEXT }}>${cabin.price}</span>
          <span style={{ fontSize: 11.5, color: MUTED }}>typical / night</span>
          {cabin.priceMin && (
            <span style={{ fontSize: 11, color: MUTED, opacity: 0.8 }}>· ${cabin.priceMin}–${cabin.priceMax}</span>
          )}
        </div>
      )}

      <div style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.55 }}>{cabin.note}</div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center', marginTop: 'auto', paddingTop: 4 }}>
        {(cabin.areas ?? []).map(a => (
          <span key={a} style={{ fontSize: 10.5, color: ACCENT, background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}`, borderRadius: 6, padding: '2px 7px' }}>📍 {a}</span>
        ))}
        {(cabin.tags ?? []).map(t => (
          <span key={t} style={{ fontSize: 10.5, color: MUTED, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '2px 7px' }}>{t}</span>
        ))}
        {cabin.href && (
          <a href={cabin.href} target="_blank" rel="noopener noreferrer"
            style={{ marginLeft: 'auto', color: ACCENT, fontSize: 11, textDecoration: 'none', fontWeight: 600 }}>Listing ↗</a>
        )}
      </div>
    </div>
  );
}

function CabinBrowser({ cabins, area, onClearArea, heading = 'The cabins' }) {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('size');

  const filters = useMemo(() => filtersFor(cabins), [cabins]);
  const hasPrices = cabins.some(c => c.price);
  // Only some properties publish where a unit sits on the land.
  const located = cabins.filter(c => c.areas?.length).length;

  const counts = useMemo(
    () => Object.fromEntries(filters.map(f => [f.key, cabins.filter(f.match).length])),
    [cabins, filters],
  );

  const shown = useMemo(() => {
    const active = filters.find(f => f.key === filter) ?? filters[0];
    let list = cabins.filter(active.match);
    if (area) list = list.filter(c => c.areas?.includes(area));
    // Units without a published figure sort last rather than jumping to front.
    if (sort === 'size') return [...list].sort((a, b) => (a.guests ?? Infinity) - (b.guests ?? Infinity));
    if (sort === 'price') return [...list].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    return list;
  }, [cabins, filter, sort, filters, area]);

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: MUTED, letterSpacing: 1.5, textTransform: 'uppercase' }}>{heading}</span>
        <span style={{ fontSize: 12, color: MUTED }}>{shown.length} of {cabins.length}</span>
        <button
          onClick={() => setSort(s => (s === 'size' ? (hasPrices ? 'price' : 'listed') : s === 'price' ? 'listed' : 'size'))}
          style={{ marginLeft: 'auto', background: 'none', border: `1px solid ${CARD_BORDER}`, borderRadius: 20, color: MUTED, fontSize: 11, padding: '3px 10px', cursor: 'pointer' }}>
          {sort === 'size' ? '↕ Smallest first' : sort === 'price' ? '↕ Cheapest first' : '↕ As listed'}
        </button>
      </div>

      {area && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 12, background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}`, borderRadius: 10, padding: '8px 12px' }}>
          <span style={{ fontSize: 12.5, color: TEXT }}>
            Showing stays near <span style={{ fontWeight: 700, color: ACCENT }}>{area}</span>
            {shown.length === 0 && ' — none of the units publish a location here'}
          </span>
          <button onClick={onClearArea}
            style={{ marginLeft: 'auto', background: 'none', border: `1px solid ${ACCENT_BORDER}`, borderRadius: 20, color: ACCENT, fontSize: 11, fontWeight: 600, padding: '3px 10px', cursor: 'pointer' }}>
            Clear
          </button>
        </div>
      )}

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        {filters.map(f => {
          const on = filter === f.key;
          return (
            <button key={f.key} onClick={() => setFilter(f.key)}
              style={{
                fontSize: 12, fontWeight: on ? 700 : 500, cursor: 'pointer',
                color: on ? '#10140f' : TEXT,
                background: on ? ACCENT : 'rgba(255,255,255,0.05)',
                border: `1px solid ${on ? ACCENT : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 20, padding: '5px 11px',
              }}>
              {f.label} <span style={{ opacity: 0.6 }}>{counts[f.key]}</span>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 10 }}>
        {shown.map(c => <CabinCard key={c.name} cabin={c} />)}
      </div>

      {located > 0 && located < cabins.length && (
        <div style={{ marginTop: 10, fontSize: 11.5, color: MUTED, lineHeight: 1.5 }}>
          {located} of {cabins.length} units say where they sit on the land; the rest are placed somewhere on the
          property without saying where, so they drop out when you pick a spot below.
        </div>
      )}
    </div>
  );
}

function AttractionSection({ attractions, area, onPick }) {
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: MUTED, letterSpacing: 1.5, textTransform: 'uppercase' }}>On the land</span>
        <span style={{ fontSize: 12, color: MUTED }}>{attractions.length} spots</span>
        <span style={{ fontSize: 11.5, color: MUTED, marginLeft: 'auto' }}>Pick one to see the stays nearest it</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 10 }}>
        {attractions.map(a => {
          const active = a.area && a.area === area;
          const clickable = Boolean(a.area);
          return (
            <div key={a.name}
              onClick={clickable ? () => onPick(active ? null : a.area) : undefined}
              style={{
                background: active ? ACCENT_DIM : 'rgba(255,255,255,0.03)',
                border: `1px solid ${active ? ACCENT_BORDER : CARD_BORDER}`,
                borderRadius: 12, padding: '13px 14px 12px',
                display: 'flex', flexDirection: 'column', gap: 6,
                cursor: clickable ? 'pointer' : 'default',
              }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: active ? ACCENT : TEXT, flex: 1, lineHeight: 1.25 }}>
                  {a.name}
                </span>
                <span style={{ fontSize: 11, color: MUTED, whiteSpace: 'nowrap' }}>{a.kind}</span>
              </div>
              <div style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.55 }}>{a.note}</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center', marginTop: 'auto', paddingTop: 4 }}>
                {a.area && (
                  <span style={{ fontSize: 10.5, color: active ? ACCENT : MUTED, background: 'rgba(255,255,255,0.05)', border: `1px solid ${active ? ACCENT_BORDER : 'rgba(255,255,255,0.08)'}`, borderRadius: 6, padding: '2px 7px' }}>
                    📍 {a.area}
                  </span>
                )}
                {a.href && (
                  <a href={a.href} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                    style={{ marginLeft: 'auto', color: ACCENT, fontSize: 11, textDecoration: 'none', fontWeight: 600 }}>Details ↗</a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ItemCard({ item }) {
  // Picking a spot on the land narrows the stays; shared by both sections.
  const [area, setArea] = useState(null);

  return (
    <div style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: 16, marginBottom: 16, overflow: 'hidden' }}>
      <div style={{ background: item.gradient, padding: '20px 18px 16px', borderBottom: `1px solid ${CARD_BORDER}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span style={{ fontSize: 26, lineHeight: 1 }}>{item.emoji}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: MUTED, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 3 }}>{item.location}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>{item.name}</div>
            <div style={{ fontSize: 14, color: MUTED, marginTop: 3 }}>{item.tagline}</div>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: ACCENT, background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}`, borderRadius: 20, padding: '3px 9px', whiteSpace: 'nowrap' }}>
            {item.status}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
          <Chip>🏕️ {item.type}</Chip>
          <Chip>🚗 {item.drive}</Chip>
          <Chip>🍂 {item.season}</Chip>
        </div>
      </div>

      <div style={{ padding: '16px 18px 18px' }}>
        <p style={{ margin: '0 0 16px', fontSize: 14, color: TEXT, lineHeight: 1.6 }}>{item.why}</p>

        <div style={{ fontSize: 11, color: MUTED, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>Why it makes the list</div>
        {item.highlights.map((h, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
            <span style={{ fontSize: 15, flexShrink: 0, marginTop: 2 }}>{h.icon}</span>
            <div>
              <span style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>{h.label}: </span>
              <span style={{ fontSize: 13, color: MUTED, lineHeight: 1.55 }}>{h.detail}</span>
            </div>
          </div>
        ))}

        {item.cabins && (
          <CabinBrowser
            cabins={item.cabins}
            heading={item.attractions ? 'Where you’d stay' : 'The cabins'}
            area={area}
            onClearArea={() => setArea(null)}
          />
        )}

        {item.attractions && (
          <AttractionSection attractions={item.attractions} area={area} onPick={setArea} />
        )}

        <div style={{ margin: '20px 0 4px', background: ACCENT_DIM, border: `1.5px solid ${ACCENT_BORDER}`, borderRadius: 12, padding: '14px 16px', fontSize: 13, color: MUTED, lineHeight: 1.55 }}>
          <span style={{ fontWeight: 700, color: ACCENT, textTransform: 'uppercase', letterSpacing: 0.5, fontSize: 12 }}>Booking</span>
          <div style={{ marginTop: 6 }}>{item.booking}</div>
        </div>

        <div style={{ fontSize: 11, color: MUTED, letterSpacing: 1.5, textTransform: 'uppercase', margin: '18px 0 8px' }}>Nearby, off the property</div>
        <ul style={{ margin: 0, paddingLeft: 18, color: MUTED, fontSize: 13, lineHeight: 1.6 }}>
          {item.nearby.map((n, i) => <li key={i}>{n}</li>)}
        </ul>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
          {item.links.map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, fontWeight: 600, color: ACCENT, textDecoration: 'none', background: 'rgba(255,255,255,0.05)', border: `1px solid ${ACCENT_BORDER}`, borderRadius: 20, padding: '5px 12px' }}>
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BucketList() {
  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: BG, minHeight: '100vh', color: TEXT }}>
      <div style={{ background: 'linear-gradient(160deg, #1f2a1a 0%, #10140f 100%)', borderBottom: `1px solid ${ACCENT_BORDER}`, padding: '28px 20px 24px' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: MUTED, textDecoration: 'none', marginBottom: 18, letterSpacing: 0.3 }}>
          ← Three Oaks Planner
        </Link>
        <div style={{ fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', color: ACCENT, marginBottom: 6, opacity: 0.9 }}>
          Someday · Places worth the drive
        </div>
        <h1 style={{ margin: '0 0 4px', fontSize: 30, fontWeight: 800, letterSpacing: -0.5, color: '#fff' }}>Vacation Bucket List 🧭</h1>
        <p style={{ margin: '0 0 14px', fontSize: 15, color: MUTED }}>
          {items.length} {items.length === 1 ? 'place' : 'places'} on the list — trips we haven&apos;t taken yet.
        </p>
      </div>

      <div style={{ padding: '16px 16px 48px' }}>
        {items.map(item => <ItemCard key={item.id} item={item} />)}

        <div style={{ marginTop: 4, padding: '14px 16px', background: CARD_BG, border: `1px dashed ${CARD_BORDER}`, borderRadius: 16, fontSize: 13, color: MUTED, lineHeight: 1.55 }}>
          <span style={{ fontWeight: 700, color: TEXT }}>Red River Gorge figures last refreshed {scrapedOn}</span> by the
          scrape workflow, which rechecks capacities, ratings and nightly rates monthly. Hideaway on the Hocking publishes
          no machine-readable rates, so its details are hand-entered.{' '}
          <span style={{ fontWeight: 700, color: TEXT }}>Add the next place:</span> drop another object into the{' '}
          <code style={{ background: 'rgba(255,255,255,0.06)', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>items</code> array in{' '}
          <code style={{ background: 'rgba(255,255,255,0.06)', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>src/BucketList.jsx</code> and it shows up here.
        </div>
      </div>
    </div>
  );
}
