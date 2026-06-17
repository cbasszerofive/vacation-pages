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
    label: 'Departure — Eastward Bound',
    icon: '✈️',
    activities: [
      {
        text: 'Depart Cleveland Hopkins Airport (CLE)',
        detail: 'United Airlines, connecting through Newark (EWR). Flight doors: 8:50 PM. Get comfortable — it\'s a long overnight flight.',
        icon: '🛫',
      },
      {
        text: 'Overnight transatlantic flight → Berlin Brandenburg (BER)',
        detail: 'Berlin is 6 hours ahead of Cleveland. Rest on the plane.',
        icon: '🌙',
      },
    ],
  },
  {
    date: 'Mon · Oct 26',
    label: 'Willkommen in Berlin',
    icon: '🏙️',
    activities: [
      {
        text: 'Arrive Berlin — approximately 3:00 AM',
        detail: 'Transfer to the hotel after landing. It\'s the middle of the night Berlin time — the goal is to get checked in and get a few hours of real sleep.',
        icon: '🛬',
      },
      {
        text: 'Check in — SO/ Berlin Das Lohse Hotel',
        detail: 'Your home base for the week, right in the heart of the city.',
        icon: '🏨',
        highlight: true,
      },
      {
        text: 'Welcome dinner at Zur letzten Instanz',
        detail: 'Berlin\'s oldest restaurant, established 1621. The name means "Last Instance" — there\'s a courthouse next door. Napoleon reportedly warmed himself by the tile stove here in 1806 during his occupation of Berlin; Beethoven and Charlie Chaplin also dined here. Dark wood, low ceilings, tile stoves — properly old. Traditional Berlin food: order the Eisbein (slow-roasted pork knuckle) or Königsberger Klopse (meatballs in caper cream sauce). A great way to meet your fellow travelers.',
        icon: '🍺',
        group: true,
        link: { label: 'Website', href: 'https://www.zurletzteninstanz.com' },
      },
    ],
    free: {
      label: 'Free Time — Afternoon',
      notes: 'After a 3 AM arrival and a morning rest, you\'ll have the afternoon before the welcome dinner. Keep it easy — you\'ll be running on limited sleep. Late October means sunset around 5:30 PM, so the golden hour comes early.',
      ideas: [
        { place: 'Café Einstein Stammhaus', detail: 'Grand Viennese coffeehouse — dark wood, marble, white-jacketed waiters. Perfect for Christina\'s first Berlin coffee and an Apfelstrudel to settle in after the flight.', link: 'https://maps.app.goo.gl/KWPgK7N5YSt3MxYP8' },
        { place: 'Walk Unter den Linden to Brandenburg Gate', detail: 'Berlin\'s grand boulevard — 1.4km lined with linden trees from the palace to the Gate. Classic first-look stroll. ~30 minutes leisurely, easy photo stops along the way.', link: 'https://maps.app.goo.gl/VLUzqZY6HtJuHRfU6' },
        { place: 'Hackescher Markt & the Höfe', detail: 'A complex of eight interconnected Art Nouveau courtyards filled with boutiques and cafés. Good for a gentle wander with no agenda.', link: 'https://maps.app.goo.gl/hNqE3RiZJX7GVMYP7' },
      ],
    },
  },
  {
    date: 'Tue · Oct 27',
    label: 'Stories, Architecture & Cabaret',
    icon: '🕍',
    activities: [
      { text: 'Buffet breakfast', icon: '🥐', group: true },
      {
        text: 'Memorial to the Murdered Jews of Europe (Holocaust Memorial)',
        detail: '2,711 concrete stelae of varying heights covering 4.7 acres, designed by Peter Eisenman (opened 2005). The above-ground field is disorienting by design — the ground undulates, the blocks grow taller as you move inward. The underground Information Center tells individual victims\' stories with names and photographs. Free entry; allow 1–2 hours. Steps from Brandenburg Gate.',
        icon: '🕍', group: true,
        link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/LfCwBxULmTTw5L9j7' },
      },
      {
        text: 'Private coach panoramic city tour with local guide',
        detail: 'Covers Berlin\'s major landmarks: Brandenburg Gate, Reichstag, Checkpoint Charlie, East Side Gallery, Potsdamer Platz, and the former division between East and West. A good way to get oriented before exploring on foot.',
        icon: '🚌', group: true,
      },
      {
        text: 'Dinner & live performance at Bar Jeder Vernunft',
        detail: 'The legendary Mirror Tent (Spiegelzelt) in the Tiergarten — an Art Nouveau mirror-and-velvet tent from 1912, seating ~230 in a chandelier-lit interior that feels like another century. Shows blend cabaret, chanson, comedy, and jazz. Past performers include Ute Lemper, k.d. lang, and Max Raabe. Time Out called it "one of the most cabaret experiences of its kind in Berlin." Smart casual dress.',
        icon: '🎭', group: true,
        link: { label: 'Website', href: 'https://bar-jeder-vernunft.de/en' },
      },
    ],
  },
  {
    date: 'Wed · Oct 28',
    label: 'Reflection & Royal Splendor',
    icon: '🏛️',
    activities: [
      { text: 'Breakfast', icon: '🥐', group: true },
      {
        text: 'Sachsenhausen Concentration Camp Memorial',
        detail: 'About 30 minutes north of Berlin in Oranienburg. Opened 1936 as the SS\'s model concentration camp; approximately 200,000 prisoners were held here, tens of thousands of whom died. The memorial complex includes original barracks, punishment cells, execution sites, and a thorough permanent exhibition. Wear comfortable shoes — extensive outdoor walking on gravel. Budget 2–3 hours. Emotionally heavy; the group will likely be quiet on the coach to Potsdam.',
        icon: '🕯️', group: true,
        link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/bJHFtJoSVrdFqaLK8' },
      },
      {
        text: 'Potsdam — Marble Palace & Sanssouci',
        detail: 'Sanssouci (French for "without a care") was Frederick the Great\'s personal retreat — intimate and unusual. A single-story rococo palace perched atop six terraced levels of grapevines, built 1747. Frederick is buried here under the terrace among his greyhounds, per his own wishes. The 300-hectare park holds multiple palaces and follies. The Marble Palace (Marmorpalais) sits on the shore of Heiliger See — neoclassical, built for Frederick William II in the 1790s. UNESCO World Heritage Site. Late October means fewer crowds and autumn foliage.',
        icon: '🌿', group: true,
        link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/oLbw4QvHa7bV2Qcu5' },
      },
    ],
    free: {
      label: 'Free Time — Evening',
      notes: 'The biggest open evening of the trip. You\'ll be back in Berlin after Potsdam — good energy for dinner somewhere memorable and a walk.',
      ideas: [
        { place: 'Nobelhart & Schmutzig', detail: '"Brutally local" tasting menu — only ingredients from within 200km of Berlin. One of the city\'s most talked-about restaurants. Book at least a week ahead.', link: 'https://maps.app.goo.gl/2vsPcVfJjfeBivAy8' },
        { place: 'Ottenthal', detail: 'Cozy Austrian restaurant in Charlottenburg — outstanding wine list, excellent schnitzel, warm atmosphere. Lower-key but genuinely excellent.', link: 'https://maps.app.goo.gl/JpkMkEEjmhZjhNEH9' },
        { place: 'Spree riverbank walk (Museumsinsel)', detail: 'The stretch along the Spree past Museum Island and the Berlin Cathedral is beautiful lit up at night — bridges, reflections on the water. Easy 20-minute walk from Mitte.', link: 'https://maps.app.goo.gl/j2WFJ8JPRS1LMJnXA' },
        { place: 'Gendarmenmarkt at night', detail: 'Berlin\'s most beautiful square — French Cathedral, German Cathedral, and Konzerthaus flanking a wide open plaza. Five minutes from Unter den Linden.', link: 'https://maps.app.goo.gl/yiHDENGGM1nfJCGU7' },
      ],
      avoid: ['Bar Jeder Vernunft', 'Zur letzten Instanz', 'Babel at Gropius Bau', 'Mittelalter dinner venue'],
    },
  },
  {
    date: 'Thu · Oct 29',
    label: 'Art, Memory & Opera',
    icon: '🎼',
    activities: [
      { text: 'Breakfast', icon: '🥐', group: true },
      {
        text: 'Topography of Terror Museum',
        detail: 'Built on the exact site of the former SS and Gestapo headquarters. Outdoor and indoor exhibitions document the Nazi terror apparatus in clinical, powerful detail. Free entry. Puts much of what you\'ve already seen in Berlin into a broader context.',
        icon: '🏛️', group: true,
        link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/Q8tHH1BhCGPeKP1F6' },
      },
      {
        text: 'Lunch included — Babel at the Gropius Bau',
        detail: 'The Martin-Gropius-Bau is a grand neo-Renaissance exhibition hall adjacent to the Topography of Terror. Babel is the in-house restaurant: seasonal menu, good natural light, a calm midday stop. A local guide will walk you through the building and the surrounding area, including the nearby car-free village of Lichde and its marketplace for a taste of local food.',
        icon: '🍽️', group: true,
        link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/Q8tHH1BhCGPeKP1F6' },
      },
      {
        text: 'Deutsche Oper Berlin',
        detail: 'One of Germany\'s finest and largest opera houses, in Charlottenburg. World-class productions across the full operatic repertoire. Even if opera is new to you, this is a world-class experience worth dressing up for. Program to be announced May 2026.',
        icon: '🎼', group: true,
        link: { label: 'Website', href: 'https://www.deutscheoperberlin.de/en' },
      },
    ],
  },
  {
    date: 'Fri · Oct 30',
    label: 'Day at Leisure',
    icon: '🗓️',
    activities: [
      {
        text: 'Activities TBD — check with group organizer',
        detail: 'This day is not specified in the official ORMACO itinerary. Confirm with your trip organizer whether activities are planned.',
        icon: '📋',
      },
    ],
  },
  {
    date: 'Sat · Oct 31',
    label: 'Museum Island & Symphony Night',
    icon: '🎻',
    activities: [
      { text: 'Breakfast', icon: '🥐', group: true },
      {
        text: 'Museum Island (Museumsinsel)',
        detail: 'A UNESCO World Heritage site — five world-class museums on a small island in the Spree River. The Pergamon holds massive reconstructed ancient gates (the Pergamon Altar, the Ishtar Gate of Babylon). The Neues Museum houses the famous bust of Nefertiti. The Alte Nationalgalerie has 19th-century European paintings. Allow a full morning; it\'s easy to spend 3+ hours here.',
        icon: '🏛️', group: true,
        link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/WZ3BHQAaJFV2vrG99' },
      },
      {
        text: 'Rundfunk-Sinfonieorchester Berlin — evening symphony',
        detail: 'One of Germany\'s most prestigious orchestras, founded in 1923. Performs at the Berliner Philharmonie or the Haus des Rundfunks depending on the program. A beautiful capstone to a day in the arts. Program to be announced May 2026.',
        icon: '🎻', group: true,
      },
    ],
  },
  {
    date: 'Sun · Nov 1',
    label: 'Democracy, Memory & Farewell Feast',
    icon: '🏰',
    activities: [
      { text: 'Breakfast', icon: '🥐', group: true },
      {
        text: 'Bundestag — glass dome tour',
        detail: 'Germany\'s parliament building, topped by Sir Norman Foster\'s iconic glass dome (1999). A spiral walkway winds up inside for panoramic views over the city. The dome is symbolically transparent — you can look down into the plenary chamber below. Free with advance registration.',
        icon: '🏛️', group: true,
        link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/3JNf9y9xzpRB5JYRA' },
      },
      {
        text: 'Brandenburg Gate, Holocaust Memorial & Tiergarten walk',
        detail: 'A guided walk through the historic district connecting the landmarks at the heart of Berlin\'s divided and reunified history. The Tiergarten is Berlin\'s central park — 210 hectares of woodland in the middle of the city.',
        icon: '🚶', group: true,
      },
      {
        text: 'Mittelalter medieval dinner — farewell feast',
        detail: 'The group\'s final dinner together: an immersive medieval-themed experience with period costumes, mead and ale, no modern cutlery (eat with hands and a knife), and live entertainment — juggling, music, comedy. Loud, theatrical, and a genuinely fun send-off after a week of heavy culture.',
        icon: '⚔️', group: true,
      },
    ],
    free: {
      label: 'Free Time — Afternoon',
      notes: 'The most open window of the trip. Note: Sunday trading laws in Germany mean most shops are closed, with exceptions for markets, cafés, museums, and tourist-area stores.',
      ideas: [
        { place: 'East Side Gallery', detail: '1.3km of murals painted on the surviving Berlin Wall by international artists after reunification. Free, always open. The "Fraternal Kiss" and "Trabant through the wall" are the iconic shots. Allow 45–60 min to walk the length.', link: 'https://maps.app.goo.gl/xVST3e7QdBHGb8f88' },
        { place: 'Ampelmännchen flagship store (Hackescher Markt)', detail: 'The little East German crosswalk figure is THE Berlin souvenir. The flagship carries mugs, magnets, shirts, and toys — ideal for 4 kids at every price point.', link: 'https://maps.app.goo.gl/nGUHhyCiPfPV7YZS9' },
        { place: 'Fassbender & Rausch chocolate shop (Gendarmenmarkt)', detail: 'Billed as Europe\'s largest chocolate shop — two floors, elaborate chocolate sculptures of Berlin landmarks, and a rooftop café. Great for kid gifts. The hot chocolate is exceptional for Christina.', link: 'https://maps.app.goo.gl/HHWTwUJQNUkK7eNG6' },
        { place: 'DDR Museum', detail: 'Hands-on exhibit on everyday life in East Germany — sit in a simulated Trabant, see a furnished East German apartment, understand what the Stasi was monitoring. Very accessible; on the Spree across from the Berlin Cathedral.', link: 'https://maps.app.goo.gl/BXRtWk5Hp5YMW1vt9' },
        { place: 'Prenzlauer Berg neighborhood', detail: 'The most pleasant Sunday-strolling neighborhood in Berlin — tree-lined streets, independent cafés, Kastanienallee boutiques. Kollwitzplatz Sunday market (closes ~2 PM). Good photos.', link: 'https://maps.app.goo.gl/Xv3e9qb7MFsWcSGU7' },
      ],
      avoid: ['Bundestag (morning group activity)', 'Mittelalter dinner venue (evening group activity)'],
    },
  },
  {
    date: 'Mon · Nov 2',
    label: 'Auf Wiedersehen — Departure',
    icon: '🛫',
    activities: [
      { text: 'Depart Berlin Brandenburg Airport (BER)', icon: '✈️' },
      { text: 'Arrive Newark (EWR) — 11:35 PM', detail: 'Overnight layover at Newark.', icon: '🌙' },
      { text: 'Depart Newark (EWR) — 4:00 PM (next day)', detail: 'Connecting flight home.', icon: '🛫' },
      { text: 'Arrive Cleveland Hopkins (CLE) — 5:40 PM', icon: '🏠' },
    ],
  },
];

const tips = [
  { icon: '🌧️', label: 'Weather', detail: 'Late October in Berlin: 8–13°C (46–55°F), overcast, occasional rain. Pack layers and a packable rain jacket. Daylight runs roughly 7:30 AM–5:30 PM.' },
  { icon: '💶', label: 'Cash', detail: 'Berlin is unusually cash-heavy for a major European city. Many restaurants, cafés, and shops still don\'t take cards. Carry €50–100 at all times. ATMs are easy to find.' },
  { icon: '🚇', label: 'Transit', detail: 'Berlin\'s BVG network (U-Bahn, S-Bahn, trams, buses) is excellent. A day ticket (Tageskarte) runs ~€9–10 and is worth it on free days. Validate before boarding.' },
  { icon: '🗣️', label: 'Language', detail: 'German, but English is widely spoken in central Berlin, hotels, and tourist areas. A "Danke" and "Bitte" go a long way.' },
  { icon: '🍽️', label: 'Tipping', detail: 'Not mandatory but appreciated. Tell the server what to charge when paying — you say a specific amount rather than leaving cash on the table. ~10% is generous.' },
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
                  style={{ color: GOLD, fontSize: 11, textDecoration: 'none', fontWeight: 600 }}>Maps ↗</a>
              )}
            </div>
            <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.5 }}>{idea.detail}</div>
          </div>
        ))}
      </div>
      {free.avoid && (
        <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${GOLD_BORDER}`, fontSize: 12, color: MUTED }}>
          <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Skip for free time (already on group itinerary):</span>{' '}
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

      {[...groupItems, ...personalItems].map((a, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
          <span style={{ fontSize: 15, flexShrink: 0, marginTop: 2 }}>{a.icon}</span>
          <div>
            <div style={{
              fontSize: 14, lineHeight: 1.45, marginBottom: a.detail ? 4 : 0,
              color: a.highlight ? GOLD : a.group ? TEXT : MUTED,
              fontWeight: a.highlight ? 700 : 400,
            }}>
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
          ORMACO Trip & Tours · A Music, Arts & Culture Journey
        </div>
        <h1 style={{ margin: '0 0 4px', fontSize: 30, fontWeight: 800, letterSpacing: -0.5, color: '#fff' }}>Berlin 🇩🇪</h1>
        <p style={{ margin: '0 0 14px', fontSize: 15, color: MUTED }}>October 25 – November 2, 2026 · Chris & Christina</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[['9 days', '📅'], ['3 free time blocks', '🕐'], ['30 travelers', '👥'], ['SO/ Berlin Das Lohse Hotel', '🏨']].map(([label, icon]) => (
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
