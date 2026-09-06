import { Link } from 'react-router-dom';

const BG = '#10140f';
const CARD_BG = '#1a1f18';
const CARD_BORDER = 'rgba(255,255,255,0.07)';
const ACCENT = '#e0a03c';
const ACCENT_DIM = 'rgba(224,160,60,0.13)';
const ACCENT_BORDER = 'rgba(224,160,60,0.35)';
const TEXT = '#eae8e2';
const MUTED = 'rgba(234,232,226,0.52)';

const items = [
  {
    name: 'The Hideaways',
    emoji: '🧗',
    tagline: 'Cliffside cabins in the Red River Gorge',
    location: 'Red River Gorge · Eastern Kentucky',
    type: 'Boutique cabin collection',
    drive: '~5 hr from Cleveland',
    season: 'Best in October — peak foliage in the Gorge',
    status: 'Dreaming',
    gradient: 'linear-gradient(160deg, #2c3a24 0%, #10140f 100%)',
    why: 'The Red River Gorge is a canyon system inside Daniel Boone National Forest — sandstone cliffs, more than 100 natural arches, dense hardwood forest, and some of the best sport climbing in the world. The Hideaways is a small collection of design-forward cabins scattered through it, each one placed for privacy and a view: minutes from the trailheads, a world away from everyone else.',
    highlights: [
      { icon: '🪨', label: 'Cliffs & arches', detail: 'Natural Bridge, Sky Bridge, Gray’s Arch, Auxier Ridge — a dense cluster of short, dramatic hikes with big payoffs at the overlooks.' },
      { icon: '♨️', label: 'A hot tub with a view', detail: 'Nearly every Hideaway has a private hot tub, and several are set on decks or boulder tops looking straight out over the gorge.' },
      { icon: '🔥', label: 'Designed to slow down', detail: 'Fireplaces, grills, fire pits, and Nordic-leaning interiors. The pitch is a slower, more intentional trip rather than a packed itinerary.' },
      { icon: '📶', label: 'Remote but connected', detail: 'Starlink Wi-Fi at the flagship cabins — remote enough to feel off-grid, connected enough to stretch the stay into a work week.' },
    ],
    stays: [
      {
        name: 'Rockface Retreat',
        detail: 'The headline cabin — built 75 feet up into the cliff face with panoramic gorge views. Wrap-around deck with a 4-person hot tub and a propane fire pit, a double-sided tunnel fireplace, and an indoor steam shower with a full-height cave-view window.',
        href: 'https://book.thehideaways.co/listings/422804',
      },
      {
        name: 'The Naturalist',
        detail: 'The romantic one: sleeps 4, dog friendly, tucked into the cliffs with a private hot tub and a boulder-top deck. Nordic design, small footprint, big quiet.',
        href: 'https://book.thehideaways.co/listings/193191',
      },
      {
        name: 'And the rest of the collection',
        detail: 'The Stoic · Drop Red Gorgeous · The Boone · Shawnee Retreat · Moonlight Ridge · Rock Haus · The Yoder · a blue A-frame · and a 6,570 sq ft mansion if the whole crew comes.',
        href: 'https://thehideaways.co/red-river-gorge-cabins',
      },
    ],
    nearby: [
      'Trailheads for the Gorge’s best-known hikes are minutes away.',
      'Off-road parks and climbing crags in every direction.',
      'Local restaurants in the Campton / Slade / Rogers area.',
    ],
    booking: 'Listed on Airbnb and VRBO, but booking direct through their site is the cheapest option — worth checking both before locking anything in.',
    links: [
      { label: 'Red River Gorge page', href: 'https://thehideaways.co/redrivergorge' },
      { label: 'Book direct', href: 'https://book.thehideaways.co' },
      { label: 'Maps', href: 'https://www.google.com/maps/search/?api=1&query=Red+River+Gorge+Kentucky' },
    ],
    tags: ['Cabins', 'Hiking', 'Hot tub', 'Long weekend', 'Fall'],
  },
];

function Chip({ children }) {
  return (
    <span style={{ fontSize: 12, color: TEXT, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '4px 11px' }}>
      {children}
    </span>
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

        <div style={{ margin: '16px 0 4px', background: ACCENT_DIM, border: `1.5px solid ${ACCENT_BORDER}`, borderRadius: 12, padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 16 }}>🛏️</span>
            <span style={{ color: ACCENT, fontWeight: 700, fontSize: 14, letterSpacing: 0.3 }}>Where you&apos;d stay</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {item.stays.map((s, i) => (
              <div key={i} style={{ borderLeft: `2px solid ${ACCENT_BORDER}`, paddingLeft: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>{s.name}</span>
                  {s.href && (
                    <a href={s.href} target="_blank" rel="noopener noreferrer"
                      style={{ color: ACCENT, fontSize: 11, textDecoration: 'none', fontWeight: 600 }}>Listing ↗</a>
                  )}
                </div>
                <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.55 }}>{s.detail}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${ACCENT_BORDER}`, fontSize: 12, color: MUTED, lineHeight: 1.5 }}>
            <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Booking:</span> {item.booking}
          </div>
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

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
          {item.tags.map(t => (
            <span key={t} style={{ fontSize: 11, color: MUTED, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '3px 8px' }}>{t}</span>
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
        {items.map(item => <ItemCard key={item.name} item={item} />)}

        <div style={{ marginTop: 4, padding: '14px 16px', background: CARD_BG, border: `1px dashed ${CARD_BORDER}`, borderRadius: 16, fontSize: 13, color: MUTED, lineHeight: 1.55 }}>
          <span style={{ fontWeight: 700, color: TEXT }}>Add the next one:</span> drop another object into the{' '}
          <code style={{ background: 'rgba(255,255,255,0.06)', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>items</code> array in{' '}
          <code style={{ background: 'rgba(255,255,255,0.06)', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>src/BucketList.jsx</code> and it shows up here.
        </div>
      </div>
    </div>
  );
}
