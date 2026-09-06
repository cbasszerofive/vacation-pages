import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

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
    href: 'https://book.thehideaways.co/listings/422804',
    star: true,
  },
  {
    name: 'The Naturalist',
    tagline: 'Kentucky’s Best Hot Tub Feature · Sleeps 4 · Dogs',
    guests: 4, beds: 2, baths: 1, rating: 5.0, hotTub: true, tags: ['Couples'],
    note: 'An A-frame tucked against a towering rock face at the end of a quiet gravel drive, boulders on every side. The hot tub sits framed by cliff walls and string lights — “so romantic and peaceful,” per one guest.',
    href: 'https://book.thehideaways.co/listings/193191',
    star: true,
  },
  {
    name: 'The Taoist',
    tagline: 'Stargazing · Pet Friendly · Sleeps 4 · Fire Pit',
    guests: 4, beds: 2, baths: 1, rating: 5.0, hotTub: false, tags: ['Couples'],
    note: 'A glass front rising straight out of a 50-ft limestone cliff, with a fire pit and Adirondack chairs waiting below. Inside, a loft looks down over the sectional and a neon sign glowing above the TV.',
  },
  {
    name: 'The Onyx',
    tagline: 'Sauna · Hot Tub · Telescope · Honeymoon Vibes',
    guests: 2, beds: 1, baths: 1, rating: 5.0, hotTub: true, tags: ['Couples'],
    note: 'A modern black cabin in the tree line with its own barrel sauna out front. Open living and kitchen with a warm wood ceiling and a playful retro orange fridge.',
    star: true,
  },
  {
    name: 'The Stoic',
    tagline: 'Boulder Mounted Hot Tub · Sleeps 4 · Romantic Stay',
    guests: 4, beds: 2, baths: 1, rating: 5.0, hotTub: true, tags: ['Couples'],
    note: 'Off-grid stillness under a starlit Gorge sky. The boulder-top hot tub — string lights on as the evening cools — is the most-loved feature here, hands down.',
  },
  {
    name: 'Tunnelvision',
    tagline: 'Private · Hot Tub · Arch Views · Sleeps 2 · Pet Friendly',
    guests: 2, beds: 1, baths: 1, rating: 5.0, hotTub: true, tags: ['Couples'],
    note: 'A private ridge-top cabin deep in Gorge forest — no neighbors, no shared walls, just trees on every side and a hot tub with steam rising into the trees.',
  },
  {
    name: 'The Blackstone',
    tagline: 'Hot Tub · Outdoor Dining · Sleeps 4 · Minutes to RRG',
    guests: 4, beds: 2, baths: 2, rating: 5.0, hotTub: true, tags: ['Couples'],
    note: 'Hidden down its own gravel drive for total privacy on arrival. Golden-hour soaking in the private hot tub with treetops turning gold all around.',
  },
  {
    name: 'Drop Red Gorgeous',
    tagline: 'New Design & Furniture · Hot Tub · Pet Friendly · Sleeps 4',
    guests: 4, beds: 2, baths: 2, rating: 5.0, hotTub: true, tags: ['Couples'],
    note: 'Modern cedar and glass tucked into the canopy, up wood steps to string-lit evenings on the deck. Sliding glass walls open the dining table straight onto the forest.',
  },
  {
    name: 'Limestone Ridge',
    tagline: 'Rare Cliffside Views · Hot Tub · Fire Pit · Sleeps 6',
    guests: 6, beds: 2, baths: 2, rating: 5.0, hotTub: true, tags: ['Couples'],
    note: 'A modern A-frame in the trees with warm wood walls, layered linens, and fern art — built for slow mornings before the trails.',
  },
  {
    name: 'Hidden Cave Cottage',
    tagline: 'Cozy Cottage · Hot Tub · Game Room · Cave Fire Pit',
    guests: 8, beds: 3, baths: 2, hotTub: true, tags: ['Couples'],
    note: 'A cottage with its own cave fire pit and a game room — the rare Hideaway that sleeps eight but still reads cozy.',
  },
  {
    name: 'Moonlight Ridge',
    tagline: 'Private Mountain Top Escape · Sleeps 3 · Fire Pit · Modern Cabin',
    guests: 3, beds: 1, baths: 1, rating: 4.95, hotTub: false, tags: ['Couples'],
    note: 'Glows at dusk with a string-lit staircase up from the gravel drive. Vaulted wood ceilings and floor-to-ceiling windows, sliding doors straight onto the deck.',
  },
  {
    name: 'Cooper Pines',
    tagline: 'Cozy RRG A-frame · Hot Tub · Forest View · Fire Pit',
    guests: 8, beds: 3, baths: 2, rating: 5.0, hotTub: true, tags: ['Couples', 'Family'],
    note: 'A glowing A-frame in the trees with string lights already lit. The deck hot tub is framed by forest on every side — coffee in one hand or wine in the other.',
  },
  {
    name: 'Shawnee Retreat',
    tagline: 'Best Views in RRG · Hot Tub · Arcade · Sleeps 12 · Cave & Waterfall',
    guests: 12, beds: 6, baths: 6, rating: 5.0, hotTub: true, tags: ['Family'],
    note: 'Billed as one of the best views in all of Kentucky, with a cave and waterfall on the property and an arcade inside. Gather everyone around the fire and soak in it.',
    star: true,
  },
  {
    name: 'The Sentinel',
    tagline: 'Pickleball Court · Theater · Hot Tub · Sleeps 14',
    guests: 14, beds: 4, baths: 5, rating: 5.0, hotTub: true, tags: ['Family'],
    note: 'A grand log cabin ringed by trees — the biggest in the collection. Indoor rec space with pickleball, ping pong, and pool, plus a theater room.',
  },
  {
    name: 'Greywood Reserve',
    tagline: 'Nerf Blasters · Hot Tub · Mural · Arcade · Sunset',
    guests: 12, beds: 4, baths: 4, rating: 5.0, hotTub: true, tags: ['Family'],
    note: 'A big-group cabin with a covered hot tub looking at the mountains, an arcade, a mural, and Nerf blasters in the closet. Fire pit at sunset.',
  },
  {
    name: 'Pond Paradise',
    tagline: 'Hot Tub · Off-Road Parks · Private Fishing Pond · Sleeps 7',
    guests: 7, beds: 2, baths: 2, rating: 5.0, hotTub: true, tags: ['Family'],
    note: 'Seven acres of open lawn, a private fishing pond, and a covered daybed swing on the porch. “We have rented a dozen or more cabins around the gorge and this one hands down is the best!” — Steve',
  },
  {
    name: 'The Russet',
    tagline: 'Family Cabin · Hot Tub · Kid Games · King Bed · Sleeps 8',
    guests: 8, beds: 3, baths: 2, rating: 5.0, hotTub: true, tags: ['Family'],
    note: 'A quiet wooded lot with a big deck and a warm, cabin-cozy king primary. Kid games inside for the in-between hours.',
  },
  {
    name: 'The Boone',
    tagline: 'New Silo Cabin · Sleeps 4 · Hot Tub · Trailer Parking · Near Food & Trails',
    guests: 4, beds: 2, baths: 2, rating: 5.0, hotTub: true, tags: ['Silos', 'Couples'],
    note: 'Twin silos rising out of blazing fall color, wrapped by a deck. Inside, vaulted wood beams meet the curved silo wall over a navy island and leather barstools.',
    star: true,
  },
  {
    name: 'The Yoder',
    tagline: 'Romantic Silo Escape · Sleeps 2 · Hot Tub · String Light Foot Bridge',
    guests: 2, beds: 1, baths: 1, rating: 5.0, hotTub: true, tags: ['Silos', 'Couples'],
    note: 'A string-lit wooden boardwalk winds through the forest to the door. The king bedroom is a sanctuary — vaulted wood-beam ceiling, one oversized window pulling the forest inside.',
  },
  {
    name: 'The Rock Haus',
    tagline: 'Unique Silo House · Hot Tub · King Beds · Sleeps 6 · SxS Trails',
    guests: 6, beds: 3, baths: 2, rating: 5.0, hotTub: true, tags: ['Silos', 'Family'],
    note: 'A bold primary suite under a vaulted silo ceiling, king bed and sofa nook. The hot tub hides behind a privacy wall on the wraparound deck. Side-by-side trails from the door.',
  },
  {
    name: 'The Holler',
    tagline: 'Unique Silo Cabin · Hot Tub · Sleeps 6 · 3 King Beds · Trailer Space',
    guests: 6, beds: 3, baths: 2, rating: 5.0, hotTub: true, tags: ['Silos', 'Family'],
    note: 'Three king beds and an open floor plan under vaulted ceilings, living room running straight into the kitchen — room for the whole group’s gear.',
  },
  {
    name: 'The Derby',
    tagline: 'Private Fire Pit · Outdoor Games · Hot Tub · King Bed · Trailer Parking',
    guests: 8, beds: 3, baths: 2, rating: 5.0, hotTub: true, tags: ['Silos', 'Family'],
    note: 'A silo in the woods with a wraparound deck that puts you right in the trees — hot tub on one side, Adirondack chairs and outdoor games for the rest of the crew.',
  },
  {
    name: 'The Still',
    tagline: 'Unique Silo Cabin · King Bed · Private Hot Tub · Fire Pit · Trailer Friendly',
    guests: 8, beds: 3, baths: 2, rating: 4.95, hotTub: true, tags: ['Silos', 'Family'],
    note: 'A black silo silhouette above a 50-foot wraparound deck, with Adirondack chairs, hot tub, and grill all staged. String lights glow against the wood privacy wall.',
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
    booking: 'Listed on Airbnb and VRBO, but booking direct through their site is the cheapest option — worth comparing before locking anything in. The Hideaways also run 5 cabins in Hocking Hills, OH and 1 in Blue Ridge, GA.',
    links: [
      { label: 'Red River Gorge page', href: 'https://thehideaways.co/redrivergorge' },
      { label: 'All 23 cabins', href: 'https://thehideaways.co/red-river-gorge-cabins' },
      { label: 'Book direct', href: 'https://book.thehideaways.co' },
      { label: 'Maps', href: 'https://www.google.com/maps/search/?api=1&query=Red+River+Gorge+Kentucky' },
    ],
    cabins: rrgCabins,
  },
];

const FILTERS = [
  { key: 'all', label: 'All', match: () => true },
  { key: 'couples', label: '💑 Couples', match: c => c.tags.includes('Couples') },
  { key: 'family', label: '👨‍👩‍👧 Family', match: c => c.tags.includes('Family') },
  { key: 'silos', label: '🌾 Silos', match: c => c.tags.includes('Silos') },
  { key: 'hottub', label: '♨️ Hot tub', match: c => c.hotTub },
  { key: 'big', label: '🎉 Sleeps 8+', match: c => c.guests >= 8 },
];

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
          <span style={{ fontSize: 12, color: MUTED, whiteSpace: 'nowrap' }}>{cabin.rating.toFixed(2)} ★</span>
        )}
      </div>

      <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.4 }}>{cabin.tagline}</div>

      <div style={{ display: 'flex', gap: 10, fontSize: 12, color: TEXT, opacity: 0.85, flexWrap: 'wrap' }}>
        <span>👥 {cabin.guests}</span>
        <span>🛏️ {cabin.beds}</span>
        <span>🚿 {cabin.baths}</span>
        {cabin.hotTub && <span>♨️ Hot tub</span>}
      </div>

      <div style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.55 }}>{cabin.note}</div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center', marginTop: 'auto', paddingTop: 4 }}>
        {cabin.tags.map(t => (
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

function CabinBrowser({ cabins }) {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('size');

  const counts = useMemo(
    () => Object.fromEntries(FILTERS.map(f => [f.key, cabins.filter(f.match).length])),
    [cabins],
  );

  const shown = useMemo(() => {
    const active = FILTERS.find(f => f.key === filter) ?? FILTERS[0];
    const list = cabins.filter(active.match);
    return sort === 'size'
      ? [...list].sort((a, b) => a.guests - b.guests)
      : list;
  }, [cabins, filter, sort]);

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: MUTED, letterSpacing: 1.5, textTransform: 'uppercase' }}>The cabins</span>
        <span style={{ fontSize: 12, color: MUTED }}>{shown.length} of {cabins.length}</span>
        <button
          onClick={() => setSort(s => (s === 'size' ? 'listed' : 'size'))}
          style={{ marginLeft: 'auto', background: 'none', border: `1px solid ${CARD_BORDER}`, borderRadius: 20, color: MUTED, fontSize: 11, padding: '3px 10px', cursor: 'pointer' }}>
          {sort === 'size' ? '↕ Smallest first' : '↕ As listed'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        {FILTERS.map(f => {
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
    </div>
  );
}

function ItemCard({ item }) {
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

        {item.cabins && <CabinBrowser cabins={item.cabins} />}

        <div style={{ margin: '20px 0 4px', background: ACCENT_DIM, border: `1.5px solid ${ACCENT_BORDER}`, borderRadius: 12, padding: '14px 16px', fontSize: 13, color: MUTED, lineHeight: 1.55 }}>
          <span style={{ fontWeight: 700, color: ACCENT, textTransform: 'uppercase', letterSpacing: 0.5, fontSize: 12 }}>Booking</span>
          <div style={{ marginTop: 6 }}>{item.booking}</div>
        </div>

        <div style={{ fontSize: 11, color: MUTED, letterSpacing: 1.5, textTransform: 'uppercase', margin: '18px 0 8px' }}>Nearby</div>
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
          <span style={{ fontWeight: 700, color: TEXT }}>Add the next one:</span> drop another object into the{' '}
          <code style={{ background: 'rgba(255,255,255,0.06)', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>items</code> array in{' '}
          <code style={{ background: 'rgba(255,255,255,0.06)', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>src/BucketList.jsx</code> and it shows up here.
        </div>
      </div>
    </div>
  );
}
