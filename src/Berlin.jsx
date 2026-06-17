import { Link } from 'react-router-dom';

const GOLD = '#c9a84c';
const GOLD_DIM = 'rgba(201,168,76,0.15)';
const GOLD_BORDER = 'rgba(201,168,76,0.35)';
const BG = '#111118';
const CARD_BG = '#1a1a26';
const CARD_BORDER = 'rgba(255,255,255,0.07)';
const TEXT = '#e8e6e0';
const MUTED = 'rgba(232,230,224,0.5)';

const days = [
  {
    date: 'Sun · Oct 25',
    label: 'Departure',
    icon: '✈️',
    activities: [
      { text: 'Depart Cleveland Hopkins Airport (United Airlines, connecting through Newark)', icon: '🛫' },
      { text: 'Flight doors: 8:50 PM', icon: '🕗' },
      { text: 'Overnight transatlantic flight', icon: '🌙' },
    ],
  },
  {
    date: 'Mon · Oct 26',
    label: 'Arrival & First Look',
    icon: '🏙️',
    activities: [
      { text: 'Arrive Berlin — check in to hotel', icon: '🏨' },
      { text: 'Welcome dinner with group (venue TBD)', icon: '🍽️', group: true },
    ],
    free: {
      label: 'Free Time — Afternoon',
      notes: 'First look at the city. Good for a café crawl, a bakery, and a slow walk to shake off the flight.',
      ideas: ['Find a Konditorei for pastries + coffee', 'Wander a neighborhood on foot', 'Golden-hour photos'],
    },
  },
  {
    date: 'Tue · Oct 27',
    label: 'Jewish Memorial & City Tour',
    icon: '🕍',
    activities: [
      { text: 'Buffet breakfast', icon: '🥐', group: true },
      { text: 'Jewish Memorial (Holocaust Memorial) — architecturally striking, historically essential', icon: '🕍', group: true, link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/LfCwBxULmTTw5L9j7' } },
      { text: 'Private coach panoramic city tour with local guide', icon: '🚌', group: true },
      { text: 'Dinner & live performance at Bar Jeder Vernunft — legendary Mirror Tent cabaret (est. 1912)', icon: '🎭', group: true, link: { label: 'Website', href: 'https://bar-jeder-vernunft.de/en' } },
    ],
  },
  {
    date: 'Wed · Oct 28',
    label: 'Sachsenhausen & Potsdam',
    icon: '🏛️',
    activities: [
      { text: 'Breakfast', icon: '🥐', group: true },
      { text: 'Sachsenhausen Concentration Camp Memorial — sobering and important', icon: '🕯️', group: true, link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/bJHFtJoSVrdFqaLK8' } },
      { text: 'Potsdam — Marble Palace + Sanssouci Palace & gardens (Frederick the Great\'s rococo retreat, UNESCO World Heritage)', icon: '🌿', group: true, link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/oLbw4QvHa7bV2Qcu5' } },
    ],
    free: {
      label: 'Free Time — Evening',
      notes: 'After Potsdam — the big open evening. Good for dinner somewhere new and a post-dinner walk.',
      ideas: ['Dinner at somewhere not on the group itinerary', 'Evening stroll along the Spree or through Mitte', 'Pop into a bar or wine spot'],
      avoid: ['Zur letzten Instanz', 'Bar Jeder Vernunft', 'Babel at Gropius Bau', 'Mittelalter dinner venue'],
    },
  },
  {
    date: 'Thu · Oct 29',
    label: 'Opera Night',
    icon: '🎼',
    activities: [
      { text: 'Breakfast', icon: '🥐', group: true },
      { text: 'Opera performance — venue & title TBD (group organizer to confirm)', icon: '🎼', group: true },
      { text: 'Remainder of day TBD', icon: '📋' },
    ],
  },
  {
    date: 'Fri · Oct 30',
    label: 'Museums & Medieval Dinner',
    icon: '🏺',
    activities: [
      { text: 'Breakfast', icon: '🥐', group: true },
      { text: 'Babel restaurant at the Gropius Bau — cultural lunch stop', icon: '🍴', group: true, link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/Q8tHH1BhCGPeKP1F6' } },
      { text: 'Museum visit (TBD)', icon: '🏺', group: true },
      { text: 'Mittelalter medieval dinner — immersive themed dinner experience', icon: '⚔️', group: true },
    ],
  },
  {
    date: 'Sat · Oct 31',
    label: 'Symphony & Berlin\'s Oldest Restaurant',
    icon: '🎻',
    activities: [
      { text: 'Breakfast', icon: '🥐', group: true },
      { text: 'Berlin Philharmonic or equivalent symphony (TBD)', icon: '🎻', group: true, link: { label: 'Website', href: 'https://www.berliner-philharmoniker.de/en/' } },
      { text: 'Dinner at Zur letzten Instanz — Berlin\'s oldest restaurant (est. 1621); Napoleon, Beethoven & Chaplin dined here', icon: '🍺', group: true, link: { label: 'Website', href: 'https://www.zurletzteninstanz.com' } },
    ],
  },
  {
    date: 'Sun · Nov 1',
    label: 'Free Day',
    icon: '🗺️',
    activities: [
      { text: 'Farewell dinner with group — evening', icon: '🥂', group: true },
    ],
    free: {
      label: 'Free Time — Full Afternoon',
      notes: 'The most open window of the trip. Best day for souvenir shopping and a relaxed neighborhood explore.',
      ideas: [
        'Souvenir shopping for 4 kids (Ampelmännchen shop, KaDeWe, or Hackescher Markt market)',
        'Explore Prenzlauer Berg or Kreuzberg on foot',
        'Afternoon museum (Pergamon, Jewish Museum, DDR Museum)',
        'Coffee & pastries at a Café in Mitte',
        'Photo walk — Brandenburg Gate, East Side Gallery',
      ],
    },
  },
  {
    date: 'Mon · Nov 2',
    label: 'Departure',
    icon: '🛫',
    activities: [
      { text: 'Depart Berlin — return to Cleveland', icon: '✈️' },
    ],
  },
];

function FreeBlock({ free }) {
  return (
    <div style={{
      margin: '14px 0 4px',
      background: GOLD_DIM,
      border: `1.5px solid ${GOLD_BORDER}`,
      borderRadius: 12,
      padding: '14px 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 16 }}>🕐</span>
        <span style={{ color: GOLD, fontWeight: 700, fontSize: 14, letterSpacing: 0.3 }}>
          {free.label}
        </span>
      </div>
      <p style={{ margin: '0 0 10px', fontSize: 14, color: TEXT, lineHeight: 1.55 }}>
        {free.notes}
      </p>
      <ul style={{ margin: 0, padding: '0 0 0 18px' }}>
        {free.ideas.map((idea, i) => (
          <li key={i} style={{ fontSize: 13, color: TEXT, marginBottom: 4, lineHeight: 1.45 }}>{idea}</li>
        ))}
      </ul>
      {free.avoid && (
        <div style={{ marginTop: 10, fontSize: 12, color: MUTED }}>
          <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Skip (already on group itinerary):</span>{' '}
          {free.avoid.join(' · ')}
        </div>
      )}
    </div>
  );
}

function DayCard({ day }) {
  const groupItems = day.activities.filter(a => a.group);
  const personalItems = day.activities.filter(a => !a.group);

  return (
    <div style={{
      background: CARD_BG,
      border: `1px solid ${CARD_BORDER}`,
      borderRadius: 16,
      padding: '18px 18px 16px',
      marginBottom: 14,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: 22 }}>{day.icon}</span>
        <div>
          <div style={{ fontSize: 11, color: MUTED, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }}>
            {day.date}
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, color: TEXT, lineHeight: 1.2 }}>
            {day.label}
          </div>
        </div>
      </div>

      {groupItems.length > 0 && (
        <div style={{ marginBottom: day.free || personalItems.length ? 10 : 0 }}>
          {groupItems.map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
              <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>{a.icon}</span>
              <div style={{ fontSize: 14, color: TEXT, lineHeight: 1.45 }}>
                {a.text}
                {a.link && (
                  <>
                    {' '}
                    <a href={a.link.href} target="_blank" rel="noopener noreferrer"
                      style={{ color: GOLD, fontSize: 12, textDecoration: 'none', fontWeight: 600 }}>
                      {a.link.label} ↗
                    </a>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {personalItems.map((a, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
          <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>{a.icon}</span>
          <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.45 }}>
            {a.text}
          </div>
        </div>
      ))}

      {day.free && <FreeBlock free={day.free} />}
    </div>
  );
}

export default function Berlin() {
  return (
    <div style={{
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      background: BG,
      minHeight: '100vh',
      color: TEXT,
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #1a1a2e 0%, #111118 100%)',
        borderBottom: `1px solid ${GOLD_BORDER}`,
        padding: '28px 20px 24px',
      }}>
        <Link to="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          fontSize: 12, color: MUTED, textDecoration: 'none',
          marginBottom: 18, letterSpacing: 0.3,
        }}>
          ← Three Oaks Planner
        </Link>
        <div style={{ fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', color: GOLD, marginBottom: 6, opacity: 0.9 }}>
          ORMACO Trip & Tours
        </div>
        <h1 style={{ margin: '0 0 4px', fontSize: 30, fontWeight: 800, letterSpacing: -0.5, color: '#fff' }}>
          Berlin 🇩🇪
        </h1>
        <p style={{ margin: '0 0 14px', fontSize: 15, color: MUTED }}>
          October 25 – November 2, 2026 · Chris & Christina
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            ['9 days', '📅'],
            ['3 free time blocks', '🕐'],
            ['2 travelers', '👫'],
          ].map(([label, icon]) => (
            <span key={label} style={{
              fontSize: 12, color: TEXT,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 20, padding: '4px 11px',
            }}>
              {icon} {label}
            </span>
          ))}
        </div>
      </div>

      {/* Free time summary bar */}
      <div style={{
        background: GOLD_DIM,
        borderBottom: `1px solid ${GOLD_BORDER}`,
        padding: '12px 20px',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ fontSize: 14 }}>🕐</span>
        <span style={{ fontSize: 13, color: GOLD, fontWeight: 700 }}>Your free time:</span>
        <span style={{ fontSize: 13, color: TEXT }}>Mon afternoon · Wed evening · Sun afternoon</span>
      </div>

      {/* Days */}
      <div style={{ padding: '16px 16px 40px' }}>
        {days.map((day, i) => <DayCard key={i} day={day} />)}

        {/* Payment section */}
        <div style={{
          background: CARD_BG,
          border: `1px solid ${CARD_BORDER}`,
          borderRadius: 16,
          padding: '18px 18px 16px',
          marginTop: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <span style={{ fontSize: 20 }}>💳</span>
            <span style={{ fontSize: 17, fontWeight: 700, color: TEXT }}>Payment</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['Total per person', '$4,900'],
              ['Deposit due', 'April 11'],
              ['Balance due', 'TBD'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${CARD_BORDER}`, paddingBottom: 10 }}>
                <span style={{ fontSize: 14, color: MUTED }}>{label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: value.startsWith('$') ? GOLD : TEXT }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
