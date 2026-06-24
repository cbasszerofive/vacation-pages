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
    label: 'Auf Wiedersehen, Ohio',
    icon: '✈️',
    activities: [
      {
        text: 'Depart Cleveland Hopkins (CLE) — 2:00 PM',
        detail: 'United Airlines, short flight to Newark (EWR).',
        icon: '🛫',
      },
      {
        text: 'Depart Newark (EWR) — 6:50 PM → Berlin Brandenburg (BER)',
        detail: 'International overnight flight. Sit back, relax, and rest up — Berlin is 6 hours ahead.',
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
        text: 'Arrive Berlin Brandenburg (BER) — 7:55 AM',
        detail: 'Collect luggage and transfer to the hotel.',
        icon: '🛬',
      },
      {
        text: 'Check in — NH Collection Berlin Mitte',
        detail: 'Four-star hotel perfectly located for exploring the city\'s vibrant heart.',
        icon: '🏨',
        highlight: true,
      },
      {
        text: 'Welcome dinner at Zur letzten Instanz',
        detail: 'Berlin\'s oldest restaurant, established 1621. The name means "Last Instance" — there\'s a courthouse next door. Napoleon reportedly warmed himself by the tile stove here in 1806; Beethoven and Charlie Chaplin also dined here. Dark wood, low ceilings, tile stoves — properly historic. Order the Eisbein (slow-roasted pork knuckle) or Königsberger Klopse (meatballs in caper cream sauce). A great way to meet your fellow travelers over hearty German food.',
        icon: '🍺',
        group: true,
        link: { label: 'Website', href: 'https://www.zurletzteninstanz.com' },
      },
    ],
    free: {
      label: 'Free Time — Afternoon',
      notes: 'After a 7:55 AM arrival you\'ll have the afternoon to settle in and explore before the welcome dinner. Late October means sunset around 5:30 PM — make the most of the daylight.',
      ideas: [
        { place: 'Café Einstein Stammhaus', detail: 'Grand Viennese coffeehouse — dark wood, marble, white-jacketed waiters. Perfect for Christina\'s first Berlin coffee and an Apfelstrudel to settle in.', link: 'https://maps.app.goo.gl/KWPgK7N5YSt3MxYP8' },
        { place: 'Walk Unter den Linden to Brandenburg Gate', detail: 'Berlin\'s grand boulevard — 1.4km lined with linden trees from the palace to the Gate. Classic first-look stroll. ~30 minutes leisurely, great photos along the way.', link: 'https://maps.app.goo.gl/VLUzqZY6HtJuHRfU6' },
        { place: 'Hackescher Markt & the Höfe', detail: 'A complex of eight interconnected Art Nouveau courtyards filled with boutiques, cafés, and galleries. Good for a gentle wander with no agenda.', link: 'https://maps.app.goo.gl/hNqE3RiZJX7GVMYP7' },
        { place: 'Five Elephant (Kreuzberg)', detail: 'One of Berlin\'s best specialty coffee roasters, also famous for their cheesecake. For Christina — a 15-min U-Bahn ride from central hotels.', link: 'https://maps.app.goo.gl/Q2kZ5h95Z7e7S7aH6' },
      ],
    },
  },
  {
    date: 'Tue · Oct 27',
    label: 'Berlin\'s Stories & Cabaret Magic',
    icon: '🕍',
    activities: [
      { text: 'Buffet breakfast', icon: '🥐', group: true },
      {
        text: 'Jewish Museum Berlin (Jüdisches Museum Berlin)',
        detail: 'Designed by Daniel Libeskind and opened in 2001, the building itself is as powerful as the collection. Its zinc-clad zigzag facade, slashing window cuts, and interior "voids" — tall, dark, empty shafts that can\'t be entered — physically communicate absence and loss. The permanent collection covers 2,000 years of German-Jewish history: not only the Holocaust, but the full arc of Jewish life, culture, and contribution to Germany. Allow 2 hours.',
        icon: '🕍', group: true,
        link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/gVKWD1oAtRkBjNdG6' },
      },
      {
        text: 'Private coach panoramic city tour with local guide',
        detail: 'A curated tour of Berlin\'s most iconic neighborhoods and landmarks — Brandenburg Gate, Reichstag, Checkpoint Charlie, East Side Gallery, Potsdamer Platz, Unter den Linden. A great way to understand the city\'s layered history before exploring on foot.',
        icon: '🚌', group: true,
      },
      {
        text: 'Dinner & performance at Bar Jeder Vernunft — Sven Ratzke',
        detail: 'The legendary Mirror Tent (Spiegelzelt) in the Tiergarten — an Art Nouveau tent from 1912 with chandelier-lit mirrors, seating ~230 in a setting that feels like another century. Tonight\'s performer is Sven Ratzke, the Dutch/German singer, entertainer, and actor whom Time Out called "one of the best cabaret performers of his generation." Expect Bowie, Brel, and vintage cabaret reimagined. Smart casual dress.',
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
        detail: 'About 30 minutes north of Berlin in Oranienburg. Opened 1936 as the SS\'s model concentration camp; approximately 200,000 prisoners were held here, tens of thousands of whom died. The memorial complex includes original barracks, punishment cells, execution sites, and a thorough permanent exhibition. Wear comfortable shoes — extensive outdoor walking on gravel. Budget 2–3 hours.',
        icon: '🕯️', group: true,
        link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/bJHFtJoSVrdFqaLK8' },
      },
      {
        text: 'Potsdam — Marble Palace & Sanssouci',
        detail: 'Sanssouci (French for "without a care") was Frederick the Great\'s personal retreat — intimate and unusual. A single-story rococo palace perched atop six terraced levels of grapevines, built 1747. Frederick is buried here under the terrace among his greyhounds, per his own wishes. The 300-hectare park holds multiple palaces and follies. The Marble Palace (Marmorpalais) sits on the shore of Heiliger See — neoclassical, built for Frederick William II in the 1790s. UNESCO World Heritage Site since 1990.',
        icon: '🌿', group: true,
        link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/oLbw4QvHa7bV2Qcu5' },
      },
    ],
    free: {
      label: 'Free Time — Evening',
      notes: 'After a heavy day, the evening is yours. Good energy for dinner somewhere personal and a nighttime walk through Mitte.',
      ideas: [
        { place: 'Nobelhart & Schmutzig', detail: '"Brutally local" tasting menu — only ingredients sourced within 200km of Berlin. One of the city\'s most talked-about restaurants. Book at least a week ahead.', link: 'https://maps.app.goo.gl/2vsPcVfJjfeBivAy8' },
        { place: 'Ottenthal', detail: 'Cozy Austrian restaurant in Charlottenburg — outstanding wine list, excellent schnitzel, warm atmosphere. Lower-key but genuinely excellent.', link: 'https://maps.app.goo.gl/JpkMkEEjmhZjhNEH9' },
        { place: 'Spree riverbank walk (Museumsinsel)', detail: 'The stretch along the Spree past Museum Island and the Berlin Cathedral is beautiful lit up at night — bridges, reflections on the water. Easy 20-minute walk from Mitte.', link: 'https://maps.app.goo.gl/j2WFJ8JPRS1LMJnXA' },
        { place: 'Gendarmenmarkt at night', detail: 'Berlin\'s most beautiful square — French Cathedral, German Cathedral, and Konzerthaus. Five minutes from Unter den Linden.', link: 'https://maps.app.goo.gl/yiHDENGGM1nfJCGU7' },
      ],
      avoid: ['Bar Jeder Vernunft', 'Zur letzten Instanz', 'Beba at Gropius Bau', 'Tafelrunde Medieval Restaurant'],
    },
  },
  {
    date: 'Thu · Oct 29',
    label: 'Art, Memory & Free Time in Mitte',
    icon: '🏺',
    activities: [
      { text: 'Breakfast', icon: '🥐', group: true },
      {
        text: 'Topography of Terror Museum',
        detail: 'Built on the exact site of the former SS and Gestapo headquarters. Outdoor and indoor exhibitions document the Nazi terror apparatus in thorough, unflinching detail. Free entry. One of the most important stops in Berlin for understanding the full context of what you\'ve seen.',
        icon: '🏛️', group: true,
        link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/Q8tHH1BhCGPeKP1F6' },
      },
      {
        text: 'Lunch included — Beba at the Gropius Bau (with live mini concert)',
        detail: 'Beba serves Mediterranean and Levantine cuisine with a focus on Jewish diaspora dishes — fresh, vibrant, and culturally resonant after the morning\'s visit. A live mini concert during the buffet lunch adds another layer. The Martin-Gropius-Bau itself is a landmark neo-Renaissance exhibition hall worth exploring.',
        icon: '🍽️', group: true,
        link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/Q8tHH1BhCGPeKP1F6' },
      },
    ],
    free: {
      label: 'Free Time — Afternoon & Evening',
      notes: 'After lunch at Beba, the rest of the day is yours. Explore the Mitte district on foot, find a café, do some gallery-hopping, or simply wander. One of the most open free windows of the trip.',
      ideas: [
        { place: 'Holocaust Memorial (Memorial to the Murdered Jews of Europe)', detail: '2,711 concrete stelae of varying heights designed by Peter Eisenman. The underground Information Center tells individual victims\' stories. Free. Steps from the Gropius Bau — easy to combine with the afternoon.', link: 'https://maps.app.goo.gl/LfCwBxULmTTw5L9j7' },
        { place: 'Mitte gallery hopping', detail: 'The area around Auguststraße in Mitte has one of the densest concentrations of contemporary art galleries in Germany — Galerie Eigen + Art, KW Institute for Contemporary Art, and many others. Most are free to enter.', link: 'https://maps.app.goo.gl/TvgTRD1uKi4ygPdT8' },
        { place: 'Dinner in Kreuzberg or Mitte', detail: 'With a full free evening, go somewhere you\'ve been eyeing. Kreuzberg has Berlin\'s best food diversity — Turkish, Middle Eastern, and inventive modern restaurants. Mitte has the elegant options.', link: 'https://maps.app.goo.gl/Fs3hJajgumCGVimH8' },
        { place: 'Bonanza Coffee Roasters', detail: 'Berlin\'s most celebrated specialty coffee roaster — for Christina. Multiple locations; the Prenzlauer Berg roastery is the flagship.', link: 'https://maps.app.goo.gl/qSPp3dNBnM1A2Zqy6' },
      ],
      avoid: ['Bar Jeder Vernunft', 'Zur letzten Instanz', 'Beba at Gropius Bau', 'Tafelrunde Medieval Restaurant'],
    },
  },
  {
    date: 'Fri · Oct 30',
    label: 'Spreewald & Grand Opera',
    icon: '🚣',
    activities: [
      { text: 'Breakfast', icon: '🥐', group: true },
      {
        text: 'Spreewald — UNESCO biosphere reserve boat tour',
        detail: 'About 1.5 hours south of Berlin by coach. The Spreewald is a network of 300km of canals and waterways winding through ancient forests and meadows. A punt boat tour reveals a quieter, pastoral Germany that feels entirely removed from the city — flat-bottomed wooden boats, silence, birdsong, willow trees. A genuine change of pace.',
        icon: '🚣', group: true,
        link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/Cc1RzYQiB9bJwHUf9' },
      },
      {
        text: 'Village of Lehde & the famous pickle store',
        detail: 'Lehde is a car-free, boat-access-only village in the heart of the Spreewald — a tiny island settlement that hasn\'t changed in centuries. The Spreewald is Germany\'s most famous pickle-producing region; Spreewald gherkins (Spreewälder Gurken) have EU protected designation of origin, like Champagne. Sample them at a local store — they taste nothing like the American supermarket version.',
        icon: '🥒', group: true,
      },
      {
        text: 'Lunch on the boat — included',
        icon: '🍽️', group: true,
      },
      {
        text: 'Deutsche Oper Berlin — evening performance',
        detail: 'One of Germany\'s largest and finest opera houses, in Charlottenburg. World-class productions across the full operatic repertoire — a very different experience from Bar Jeder Vernunft earlier in the week. Dress up. Performance program announced late spring 2026.',
        icon: '🎼', group: true,
        link: { label: 'Website', href: 'https://www.deutscheoperberlin.de/en' },
      },
    ],
  },
  {
    date: 'Sat · Oct 31',
    label: 'Museum Island & Symphony at the Philharmonie',
    icon: '🎻',
    activities: [
      { text: 'Breakfast', icon: '🥐', group: true },
      {
        text: 'Museum Island (Museumsinsel)',
        detail: 'A UNESCO World Heritage site — five world-class museums on a small island in the Spree River. The Pergamon holds massive reconstructed ancient gates (the Ishtar Gate of Babylon, the Pergamon Altar). The Neues Museum houses the famous bust of Nefertiti. The Alte Nationalgalerie has 19th-century European painting. Allow a full morning; it\'s easy to spend 3+ hours here.',
        icon: '🏛️', group: true,
        link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/WZ3BHQAaJFV2vrG99' },
      },
      {
        text: 'Leisurely afternoon',
        detail: 'A relaxed window before the evening. The Museum Island area puts you steps from the Berlin Cathedral, the Spree riverbank, and Hackescher Markt.',
        icon: '🌤️',
      },
      {
        text: 'S-Bahn to Philharmonie Berlin — S1/S2 to Potsdamer Platz',
        detail: 'From any central S-Bahn stop, ride to Potsdamer Platz (~5–10 min from Mitte), then a 10-minute walk along the Tiergarten edge to the Philharmonie. Your Berlin Welcome Card covers the ride.',
        icon: '🚇', group: true,
      },
      {
        text: 'Deutsches Symphonie-Orchester Berlin · 8:00 PM',
        detail: 'One of the world\'s great orchestras in Berlin\'s iconic Philharmonie (Herbert-von-Karajan-Straße 1). Conductor Manfred Honeck leads a program of three works: Julia Perry\'s thunderous Short Piece for Orchestra (1952/65) — five sections that transform a single motif into a work of remarkable contrasts; Robert Schumann\'s long-neglected Violin Concerto, performed by Norwegian star violinist Vilde Frang, who has been instrumental in bringing this deeply expressive work to modern audiences; and Mahler\'s First Symphony — composed in just six weeks during an emotional upheaval, weaving in "Frère Jacques" in a haunting minor key, shifting between dreamlike lyricism and sudden jolts of reality.',
        icon: '🎻', group: true,
        link: { label: 'Concert info', href: 'https://www.dso-berlin.de/de/konzert/honeck-philharmonie-berlin-30-31-10-2026/' },
      },
      {
        text: 'S-Bahn back to NH Collection Berlin Mitte',
        detail: 'S1/S2 from Potsdamer Platz — back in Mitte in about 10 minutes.',
        icon: '🚇', group: true,
      },
    ],
  },
  {
    date: 'Sun · Nov 1',
    label: 'Democracy, Memory & Farewell Feast',
    icon: '🏰',
    activities: [
      { text: 'Buffet breakfast', icon: '🥐', group: true },
      {
        text: 'Reichstag — glass dome tour',
        detail: 'Germany\'s parliament building, topped by Sir Norman Foster\'s iconic glass dome (1999). A spiral walkway winds up inside with panoramic views over Berlin. The dome is transparently symbolic — you can look down into the plenary chamber below. Free with advance registration.',
        icon: '🏛️', group: true,
        link: { label: 'Google Maps', href: 'https://maps.app.goo.gl/3JNf9y9xzpRB5JYRA' },
      },
      {
        text: 'Guided walk — Brandenburg Gate, Holocaust Memorial, Tiergarten',
        detail: 'A stroll through the historic district connecting the landmarks at the heart of Berlin\'s divided and reunified history. The Tiergarten is Berlin\'s central park — 210 hectares of woodland in the city center.',
        icon: '🚶', group: true,
      },
      {
        text: 'Farewell dinner — Tafelrunde Medieval Restaurant',
        detail: 'A festive send-off: period costumes on the staff, mead and ale, no modern cutlery (eat with hands and a knife), live entertainment. Loud, theatrical, and a genuinely fun final evening together after a week of heavy culture. "Tafelrunde" means Round Table.',
        icon: '⚔️', group: true,
      },
    ],
    free: {
      label: 'Free Time — Afternoon',
      notes: 'Last free window before the farewell dinner. Note: Sunday trading laws in Germany mean most shops are closed, except markets, cafés, museums, and tourist-area exceptions.',
      ideas: [
        { place: 'East Side Gallery', detail: '1.3km of murals on the surviving Berlin Wall by international artists. Free, always open. The "Fraternal Kiss" and "Trabant through the wall" are the iconic shots. Allow 45–60 min.', link: 'https://maps.app.goo.gl/xVST3e7QdBHGb8f88' },
        { place: 'Ampelmännchen flagship (Hackescher Markt)', detail: 'The East German crosswalk figure is THE Berlin souvenir. The flagship store has mugs, magnets, shirts, and toys — ideal for 4 kids at every price point.', link: 'https://maps.app.goo.gl/nGUHhyCiPfPV7YZS9' },
        { place: 'Fassbender & Rausch chocolate shop (Gendarmenmarkt)', detail: 'Billed as Europe\'s largest chocolate shop — elaborate chocolate sculptures of Berlin landmarks, a rooftop café, great kid gifts. The hot chocolate is exceptional for Christina.', link: 'https://maps.app.goo.gl/HHWTwUJQNUkK7eNG6' },
        { place: 'DDR Museum', detail: 'Hands-on exhibit on everyday life in East Germany — sit in a simulated Trabant, see a furnished East German apartment, understand what the Stasi actually monitored. On the Spree across from the Berlin Cathedral.', link: 'https://maps.app.goo.gl/BXRtWk5Hp5YMW1vt9' },
        { place: 'Prenzlauer Berg neighborhood stroll', detail: 'The best Sunday strolling neighborhood in Berlin — tree-lined streets, independent cafés, boutiques. Kollwitzplatz Sunday market runs mornings (closes ~2 PM).', link: 'https://maps.app.goo.gl/Xv3e9qb7MFsWcSGU7' },
      ],
      avoid: ['Tafelrunde Medieval Restaurant (evening group activity)', 'Reichstag (morning group activity)'],
    },
  },
  {
    date: 'Mon · Nov 2',
    label: 'Auf Wiedersehen — Departure',
    icon: '🛫',
    activities: [
      { text: 'Final breakfast', icon: '🥐' },
      { text: 'Early transfer to Berlin Brandenburg Airport (BER)', icon: '🚌' },
      { text: 'Depart BER — 9:55 AM', icon: '✈️' },
      { text: 'Arrive Newark (EWR) — 1:10 PM', detail: 'Plenty of time before the connecting flight.', icon: '🗽' },
      { text: 'Depart Newark (EWR) — 4:00 PM', icon: '✈️' },
      { text: 'Arrive Cleveland Hopkins (CLE) — 5:40 PM', detail: 'Home with a week of memories you won\'t forget.', icon: '🏠' },
    ],
  },
];

const tips = [
  { icon: '🎫', label: 'Berlin Welcome Card', detail: 'All travelers receive a Berlin Welcome Card — unlimited U-Bahn, S-Bahn, bus, and tram for the full trip. You won\'t need to buy any transit tickets.' },
  { icon: '🚶', label: 'Walking', detail: 'The trip requires moderate walking up to 1.5 miles / 35 minutes at a time. If needed, the group can pool together for an Uber or taxi between stops.' },
  { icon: '🌧️', label: 'Weather', detail: 'Late October in Berlin: 8–13°C (46–55°F), overcast, occasional rain. Pack layers and a packable rain jacket. Daylight: ~7:30 AM–5:30 PM.' },
  { icon: '💶', label: 'Cash', detail: 'Berlin is unusually cash-heavy. Many restaurants, cafés, and shops don\'t take cards. Carry €50–100 at all times; ATMs are easy to find.' },
  { icon: '🗣️', label: 'Language', detail: 'German, but English is widely spoken in central Berlin and tourist areas. "Danke" (thank you) and "Bitte" (please) go a long way.' },
  { icon: '🍽️', label: 'Tipping', detail: 'Tell the server what to charge when paying — say a specific amount rather than leaving cash on the table. ~10% is generous.' },
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
          <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Skip for free time (group itinerary):</span>{' '}
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
          {[['9 days', '📅'], ['4 free time blocks', '🕐'], ['30 travelers', '👥'], ['NH Collection Berlin Mitte', '🏨']].map(([label, icon]) => (
            <span key={label} style={{ fontSize: 12, color: TEXT, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '4px 11px' }}>
              {icon} {label}
            </span>
          ))}
        </div>
      </div>

      <div style={{ background: GOLD_DIM, borderBottom: `1px solid ${GOLD_BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14 }}>🕐</span>
        <span style={{ fontSize: 13, color: GOLD, fontWeight: 700 }}>Your free time:</span>
        <span style={{ fontSize: 13, color: TEXT }}>Mon afternoon · Wed evening · Thu afternoon & evening · Sun afternoon</span>
      </div>

      <div style={{ padding: '16px 16px 48px' }}>
        <TipCard />
        {days.map((day, i) => <DayCard key={i} day={day} />)}
      </div>
    </div>
  );
}
