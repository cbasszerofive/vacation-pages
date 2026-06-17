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
      { text: 'Depart Cleveland Hopkins Airport', detail: 'United Airlines connecting through Newark. Flight doors: 8:50 PM.', icon: '🛫' },
      { text: 'Overnight transatlantic flight', detail: 'Arrive Berlin ~10–11 AM local time (Berlin is UTC+1 in late October, 6 hours ahead of Cleveland).', icon: '🌙' },
    ],
  },
  {
    date: 'Mon · Oct 26',
    label: 'Arrival & First Look',
    icon: '🏙️',
    activities: [
      { text: 'Arrive Berlin — check in to hotel', detail: 'After an overnight flight you\'ll be tired but wired. Don\'t nap — push through into the afternoon to beat jet lag.', icon: '🏨' },
      { text: 'Welcome dinner with group', detail: 'Venue TBD — group organizer to confirm.', icon: '🍽️', group: true },
    ],
    free: {
      label: 'Free Time — Afternoon',
      notes: 'Best strategy after a transatlantic flight: stay on your feet, eat something good, get daylight. Late October means sunset around 5:30 PM, so the golden hour comes early.',
      ideas: [
        { place: 'Café Einstein Stammhaus', detail: 'Grand Viennese coffeehouse on Kurfürstenstraße — dark wood, marble, white-jacketed waiters. Perfect for Christina\'s first Berlin coffee and a Apfelstrudel to stabilize after the flight.', link: 'https://maps.app.goo.gl/KWPgK7N5YSt3MxYP8' },
        { place: 'Five Elephant (Kreuzberg)', detail: 'One of Berlin\'s best specialty coffee roasters. Also famous for their cheesecake. A 15-minute U-Bahn ride from most central hotels.', link: 'https://maps.app.goo.gl/Q2kZ5h95Z7e7S7aH6' },
        { place: 'Walk Unter den Linden to Brandenburg Gate', detail: 'Berlin\'s grand boulevard — 1.4km lined with linden trees from the palace to the Gate. Classic first-look stroll with easy photo stops. Takes ~30 minutes leisurely.', link: 'https://maps.app.goo.gl/VLUzqZY6HtJuHRfU6' },
        { place: 'Hackescher Markt & the Höfe', detail: 'A complex of eight interconnected Art Nouveau courtyards filled with boutiques, cafés, and galleries. Good for an easy wander without a plan.', link: 'https://maps.app.goo.gl/hNqE3RiZJX7GVMYP7' },
      ],
    },
  },
  {
    date: 'Tue · Oct 27',
    label: 'Jewish Memorial & City Tour',
    icon: '🕍',
    activities: [
      { text: 'Buffet breakfast', icon: '🥐', group: true },
      {
        text: 'Memorial to the Murdered Jews of Europe (Holocaust Memorial)',
        detail: '2,711 concrete stelae of varying heights covering 4.7 acres, designed by Peter Eisenman and opened in 2005. The above-ground field is disorienting by design — the ground undulates, the stelae grow taller as you move inward. The underground Information Center tells individual stories with names and photographs. Free entry; allow 1–2 hours. Steps from Brandenburg Gate.',
        icon: '🕍', group: true,
        link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/LfCwBxULmTTw5L9j7' },
      },
      {
        text: 'Private coach panoramic city tour with local guide',
        detail: 'Will cover Berlin\'s major landmarks: Brandenburg Gate, Reichstag (glass dome by Norman Foster), Checkpoint Charlie, East Side Gallery, Potsdamer Platz, Unter den Linden, and the division between former East and West. A good way to get oriented before exploring on your own.',
        icon: '🚌', group: true,
      },
      {
        text: 'Dinner & live performance at Bar Jeder Vernunft',
        detail: 'The legendary Mirror Tent (Spiegelzelt) in the Tiergarten — an Art Nouveau mirror-and-velvet tent from 1912, seating ~230 in a chandelier-lit interior that feels like another century. Shows blend cabaret, chanson, comedy, and jazz; past performers include Ute Lemper, k.d. lang, and Max Raabe. Time Out called it "one of the most cabaret experiences of its kind in Berlin." Smart casual dress. Performances typically in German but very accessible.',
        icon: '🎭', group: true,
        link: { label: 'Website', href: 'https://bar-jeder-vernunft.de/en' },
      },
    ],
  },
  {
    date: 'Wed · Oct 28',
    label: 'Sachsenhausen & Potsdam',
    icon: '🏛️',
    activities: [
      { text: 'Breakfast', icon: '🥐', group: true },
      {
        text: 'Sachsenhausen Concentration Camp Memorial',
        detail: 'About 30 minutes north of Berlin in Oranienburg. Opened in 1936 as the SS\'s model concentration camp; approximately 200,000 prisoners were held here between 1936–1945, tens of thousands of whom died. The memorial and museum complex includes the original barracks, punishment cells, execution sites, and a thorough permanent exhibition. Wear comfortable shoes — most of the site is outdoor walking on gravel. Budget 2–3 hours. Emotionally heavy; the group will likely be quiet on the ride to Potsdam.',
        icon: '🕯️', group: true,
        link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/bJHFtJoSVrdFqaLK8' },
      },
      {
        text: 'Potsdam — Marble Palace & Sanssouci',
        detail: 'Sanssouci (French for "without a care") was Frederick the Great\'s personal retreat, not Prussia\'s formal palace — it\'s intimate and strange. A single-story rococo building perched atop six terraced levels of grapevines. Built 1747; Frederick is buried here under the terrace among his greyhounds, per his wishes. The 300-hectare park holds multiple palaces and follies. The Marble Palace (Marmorpalais) sits on the shore of Heiliger See — neoclassical, built for Frederick William II in the 1790s. UNESCO World Heritage Site since 1990. Late October means fewer crowds; autumn foliage in the park can be beautiful.',
        icon: '🌿', group: true,
        link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/oLbw4QvHa7bV2Qcu5' },
      },
    ],
    free: {
      label: 'Free Time — Evening',
      notes: 'The biggest open evening of the trip. You\'ll be back in Berlin after Potsdam — good energy for dinner somewhere memorable and an evening walk.',
      ideas: [
        { place: 'Nobelhart & Schmutzig', detail: '"Brutally local" tasting menu — only ingredients from within 200km of Berlin. One of the city\'s most talked-about restaurants. Book a week or more ahead.', link: 'https://maps.app.goo.gl/2vsPcVfJjfeBivAy8' },
        { place: 'Ottenthal', detail: 'Cozy Austrian restaurant in Charlottenburg — outstanding wine list, schnitzel done properly, warm atmosphere. A lower-key but excellent choice.', link: 'https://maps.app.goo.gl/JpkMkEEjmhZjhNEH9' },
        { place: 'Spree riverbank walk (Museumsinsel area)', detail: 'The stretch along the Spree past Museum Island and the Berlin Cathedral is beautiful at night — lit bridges, reflections on the water. Easy 20-minute walk from Mitte.', link: 'https://maps.app.goo.gl/j2WFJ8JPRS1LMJnXA' },
        { place: 'Gendarmenmarkt at night', detail: 'Berlin\'s most beautiful square — French Cathedral, German Cathedral, and Konzerthaus. Often has a market beginning in November. 5 minutes from Unter den Linden.', link: 'https://maps.app.goo.gl/yiHDENGGM1nfJCGU7' },
      ],
      avoid: ['Zur letzten Instanz', 'Bar Jeder Vernunft', 'Babel at Gropius Bau', 'Mittelalter dinner venue'],
    },
  },
  {
    date: 'Thu · Oct 29',
    label: 'Opera Night',
    icon: '🎼',
    activities: [
      { text: 'Breakfast', icon: '🥐', group: true },
      {
        text: 'Opera performance',
        detail: 'Venue and title TBD — group organizer to confirm. Berlin has three world-class opera houses: the Staatsoper Unter den Linden (most prestigious; neoclassical building on the famous boulevard, recently renovated), the Deutsche Oper in Charlottenburg (large repertoire house), and the Komische Oper (known for bold, inventive staging). All are exceptional.',
        icon: '🎼', group: true,
      },
      { text: 'Remainder of day TBD', icon: '📋' },
    ],
  },
  {
    date: 'Fri · Oct 30',
    label: 'Museums & Medieval Dinner',
    icon: '🏺',
    activities: [
      { text: 'Breakfast', icon: '🥐', group: true },
      {
        text: 'Babel restaurant at the Gropius Bau',
        detail: 'The Martin-Gropius-Bau is a neo-Renaissance landmark exhibition hall near the former site of the Gestapo HQ (now the Topography of Terror memorial, open-air and free — worth a quick look before or after lunch). Babel is the in-house restaurant: seasonal menu, good natural light, a calm midday stop between a heavy morning and a theatrical evening.',
        icon: '🍴', group: true,
        link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/Q8tHH1BhCGPeKP1F6' },
      },
      { text: 'Museum visit (TBD — group organizer to confirm)', icon: '🏺', group: true },
      {
        text: 'Mittelalter medieval dinner',
        detail: 'An immersive themed dinner experience: no modern cutlery (eat with hands and a knife), period costumes on the staff, mead and ale, live entertainment including juggling, music, and comedy. Usually runs 2.5–3 hours. Loud, theatrical, and very fun — a good antidote to a historically heavy day.',
        icon: '⚔️', group: true,
      },
    ],
  },
  {
    date: 'Sat · Oct 31',
    label: 'Symphony & Berlin\'s Oldest Restaurant',
    icon: '🎻',
    activities: [
      { text: 'Breakfast', icon: '🥐', group: true },
      {
        text: 'Berlin Philharmonic',
        detail: 'One of the greatest orchestras in the world. The Philharmonie concert hall (1963, Hans Scharoun) places the orchestra at the center with audience seating rising around it in "vineyard" terraces — there is no bad seat. Acoustics are considered among the finest anywhere. The building itself is a major work of architecture: asymmetric, golden, and unlike anything else. Smart dress; arrive early to walk the foyer.',
        icon: '🎻', group: true,
        link: { label: 'Website', href: 'https://www.berliner-philharmoniker.de/en/' },
      },
      {
        text: 'Dinner at Zur letzten Instanz',
        detail: 'Berlin\'s oldest restaurant, established 1621 — the name means "Last Instance," a nod to the courthouse next door. Napoleon reportedly warmed himself by the tile stove in 1806 during his occupation of Berlin; Beethoven and Charlie Chaplin also dined here. Located in the historic Nikolaiviertel (Nicholas Quarter). Dark wood, low ceilings, tile stoves, properly old. Order the Eisbein (slow-roasted pork knuckle) — it\'s the signature dish and what Berliners order here. Also excellent: Königsberger Klopse (meatballs in caper cream sauce).',
        icon: '🍺', group: true,
        link: { label: 'Website', href: 'https://www.zurletzteninstanz.com' },
      },
    ],
  },
  {
    date: 'Sun · Nov 1',
    label: 'Free Day',
    icon: '🗺️',
    activities: [
      { text: 'Farewell dinner with group — evening', detail: 'Venue TBD — group organizer to confirm.', icon: '🥂', group: true },
    ],
    free: {
      label: 'Free Time — Full Afternoon',
      notes: 'The most open window of the trip. Sunday in Berlin is relaxed — shops are largely closed (Germany strictly observes Sunday trading laws) except for markets, cafés, museums, and tourist-area exceptions. Best day for the East Side Gallery, souvenirs at the markets, and a museum.',
      ideas: [
        { place: 'East Side Gallery', detail: '1.3km of murals painted directly on the surviving Berlin Wall by international artists after reunification. Free, outdoor, always open. The "Fraternal Kiss" (Brezhnev and Honecker) and "Trabant through the wall" are the iconic shots. Allow 45–60 min to walk the full length.', link: 'https://maps.app.goo.gl/xVST3e7QdBHGb8f88' },
        { place: 'Ampelmännchen flagship store (Hackescher Markt)', detail: 'The little East German crosswalk figure is THE Berlin souvenir. The flagship store carries mugs, magnets, shirts, and toys at every price point — ideal for 4 kids with different taste levels.', link: 'https://maps.app.goo.gl/nGUHhyCiPfPV7YZS9' },
        { place: 'Fassbender & Rausch chocolate shop (Gendarmenmarkt)', detail: 'Billed as Europe\'s largest chocolate shop — two floors, a rooftop café, and elaborate chocolate sculptures of Berlin landmarks. Great for kid gifts and personal indulgence. The hot chocolate is exceptional for Christina.', link: 'https://maps.app.goo.gl/HHWTwUJQNUkK7eNG6' },
        { place: 'DDR Museum', detail: 'Hands-on interactive exhibit on everyday life in East Germany — you can sit inside a simulated Trabant car, see a furnished East German apartment, and learn what the Stasi was actually monitoring. Very accessible and not overly heavy. On the Spree across from the Berlin Cathedral.', link: 'https://maps.app.goo.gl/BXRtWk5Hp5YMW1vt9' },
        { place: 'Prenzlauer Berg neighborhood stroll', detail: 'The most pleasant Sunday-strolling neighborhood in Berlin — tree-lined streets, independent cafés, Kastanienallee boutiques, Kollwitzplatz. The weekly market at Kollwitzplatz runs Sunday mornings (closes ~2 PM). Good photo backdrop.', link: 'https://maps.app.goo.gl/Xv3e9qb7MFsWcSGU7' },
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

const tips = [
  { icon: '🌧️', label: 'Weather', detail: 'Late October in Berlin: 8–13°C (46–55°F), overcast, occasional rain. Pack layers and a packable rain jacket. Daylight runs roughly 7:30 AM–5:30 PM.' },
  { icon: '💶', label: 'Cash', detail: 'Berlin is unusually cash-heavy for a major European city. Many restaurants, cafés, and shops still don\'t take cards. Carry €50–100 in cash at all times. ATMs are easy to find.' },
  { icon: '🚇', label: 'Transit', detail: 'Berlin\'s BVG network (U-Bahn, S-Bahn, trams, buses) is excellent and covers everything. A day ticket (Tageskarte) runs ~€9–10 and is worth it on free days. Validate before boarding.' },
  { icon: '🗣️', label: 'Language', detail: 'German, but English is widely spoken in central Berlin, hotels, and tourist areas. A "Danke" (thank you) and "Bitte" (please) go a long way.' },
  { icon: '🍽️', label: 'Tipping', detail: 'Not mandatory but appreciated. The custom is to round up or say a specific amount when paying — you tell the server what to charge, rather than leaving cash on the table. ~10% is generous.' },
];

function TipCard() {
  return (
    <div style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: 16, padding: '18px 18px 14px', marginBottom: 14 }}>
      <div style={{ fontSize: 12, color: MUTED, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>Good to Know</div>
      {tips.map((t, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: i < tips.length - 1 ? 12 : 0 }}>
          <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{t.icon}</span>
          <div>
            <span style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>{t.label}: </span>
            <span style={{ fontSize: 13, color: MUTED, lineHeight: 1.5 }}>{t.detail}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function FreeBlock({ free }) {
  return (
    <div style={{ margin: '14px 0 4px', background: GOLD_DIM, border: `1.5px solid ${GOLD_BORDER}`, borderRadius: 12, padding: '14px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 16 }}>🕐</span>
        <span style={{ color: GOLD, fontWeight: 700, fontSize: 14, letterSpacing: 0.3 }}>{free.label}</span>
      </div>
      <p style={{ margin: '0 0 12px', fontSize: 14, color: TEXT, lineHeight: 1.55 }}>{free.notes}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {free.ideas.map((idea, i) => (
          <div key={i} style={{ borderLeft: `2px solid ${GOLD_BORDER}`, paddingLeft: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>{idea.place}</span>
              {idea.link && (
                <a href={idea.link} target="_blank" rel="noopener noreferrer"
                  style={{ color: GOLD, fontSize: 11, textDecoration: 'none', fontWeight: 600 }}>
                  Maps ↗
                </a>
              )}
            </div>
            <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.5 }}>{idea.detail}</div>
          </div>
        ))}
      </div>
      {free.avoid && (
        <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${GOLD_BORDER}`, fontSize: 12, color: MUTED }}>
          <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Already on group itinerary — skip for free time:</span>{' '}
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
    <div style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: 16, padding: '18px 18px 16px', marginBottom: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 22 }}>{day.icon}</span>
        <div>
          <div style={{ fontSize: 11, color: MUTED, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }}>{day.date}</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: TEXT, lineHeight: 1.2 }}>{day.label}</div>
        </div>
      </div>

      {groupItems.map((a, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
          <span style={{ fontSize: 15, flexShrink: 0, marginTop: 2 }}>{a.icon}</span>
          <div>
            <div style={{ fontSize: 14, color: TEXT, lineHeight: 1.45, marginBottom: a.detail ? 4 : 0 }}>
              {a.text}
              {a.link && (
                <> <a href={a.link.href} target="_blank" rel="noopener noreferrer"
                  style={{ color: GOLD, fontSize: 12, textDecoration: 'none', fontWeight: 600 }}>
                  {a.link.label} ↗
                </a></>
              )}
            </div>
            {a.detail && <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.55 }}>{a.detail}</div>}
          </div>
        </div>
      ))}

      {personalItems.map((a, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
          <span style={{ fontSize: 15, flexShrink: 0, marginTop: 2 }}>{a.icon}</span>
          <div>
            <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.45, marginBottom: a.detail ? 4 : 0 }}>{a.text}</div>
            {a.detail && <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.55, opacity: 0.7 }}>{a.detail}</div>}
          </div>
        </div>
      ))}

      {day.free && <FreeBlock free={day.free} />}
    </div>
  );
}

export default function Berlin() {
  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: BG, minHeight: '100vh', color: TEXT }}>
      <div style={{ background: 'linear-gradient(160deg, #1a1a2e 0%, #111118 100%)', borderBottom: `1px solid ${GOLD_BORDER}`, padding: '28px 20px 24px' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: MUTED, textDecoration: 'none', marginBottom: 18, letterSpacing: 0.3 }}>
          ← Three Oaks Planner
        </Link>
        <div style={{ fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', color: GOLD, marginBottom: 6, opacity: 0.9 }}>
          ORMACO Trip & Tours
        </div>
        <h1 style={{ margin: '0 0 4px', fontSize: 30, fontWeight: 800, letterSpacing: -0.5, color: '#fff' }}>Berlin 🇩🇪</h1>
        <p style={{ margin: '0 0 14px', fontSize: 15, color: MUTED }}>October 25 – November 2, 2026 · Chris & Christina</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[['9 days', '📅'], ['3 free time blocks', '🕐'], ['2 travelers', '👫']].map(([label, icon]) => (
            <span key={label} style={{ fontSize: 12, color: TEXT, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '4px 11px' }}>
              {icon} {label}
            </span>
          ))}
        </div>
      </div>

      <div style={{ background: GOLD_DIM, borderBottom: `1px solid ${GOLD_BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14 }}>🕐</span>
        <span style={{ fontSize: 13, color: GOLD, fontWeight: 700 }}>Your free time:</span>
        <span style={{ fontSize: 13, color: TEXT }}>Mon afternoon · Wed evening · Sun afternoon</span>
      </div>

      <div style={{ padding: '16px 16px 48px' }}>
        <TipCard />
        {days.map((day, i) => <DayCard key={i} day={day} />)}
      </div>
    </div>
  );
}
