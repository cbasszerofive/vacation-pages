import { useState } from 'react';
import {
  extractPageContent, extractWithClaude, fetchPageHtml, loadApiKey, saveApiKey,
} from './extract.js';

/**
 * Add a place to the bucket list from a URL, the way the Three Oaks planner
 * does: paste a link, let Claude fill the fields, correct anything it got
 * wrong, save. Everything is editable by hand, so the flow still works when
 * the fetch is blocked or no API key is available.
 *
 * Two shapes come out of it: a whole new entry, or an attraction hung off one
 * that already exists.
 */

const SYSTEM =
  'You extract structured details about a vacation destination from a web page. ' +
  'Reply with a single JSON object and nothing else. Use null for anything the ' +
  'page does not state — never guess at figures, prices, or distances.';

const buildPrompt = (url, content, mode) => mode === 'attraction'
  ? `From this page, describe one thing to do or see.

URL: ${url}

Return JSON with exactly these keys:
{
  "name": "short name of the place",
  "kind": "one or two words: Arch, Trail, Pavilion, Water, Lookout, Museum, Farm, Town...",
  "note": "two or three sentences on what it is and why it is worth the trip"
}

PAGE CONTENT:
${content}`
  : `From this page, describe a place worth staying.

URL: ${url}

Return JSON with exactly these keys:
{
  "name": "the property or destination name",
  "tagline": "one short line, under 90 characters",
  "location": "Town · Region",
  "type": "what it is: cabin collection, lodge, resort, single cabin...",
  "season": "the season it is best in, if the page says so, else null",
  "why": "three or four sentences on what makes it worth a trip",
  "emoji": "one emoji that fits"
}

PAGE CONTENT:
${content}`;

const field = {
  width: '100%', padding: '9px 11px', borderRadius: 8, fontSize: 14, outline: 'none',
  boxSizing: 'border-box', fontFamily: 'inherit',
  background: 'rgba(255,255,255,0.05)', color: '#eae8e2',
  border: '1.5px solid rgba(255,255,255,0.14)',
};
const label = {
  display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
  letterSpacing: 0.5, color: 'rgba(234,232,226,0.52)', marginBottom: 4, marginTop: 12,
};

function Field({ name, value, onChange, placeholder, multiline }) {
  return (
    <label>
      <span style={label}>{name}</span>
      {multiline
        ? <textarea rows={3} value={value} placeholder={placeholder}
            onChange={e => onChange(e.target.value)} style={{ ...field, resize: 'vertical' }} />
        : <input value={value} placeholder={placeholder}
            onChange={e => onChange(e.target.value)} style={field} />}
    </label>
  );
}

const emptyPlace = () => ({ name: '', tagline: '', location: '', type: '', drive: '', season: '', why: '', emoji: '📍' });
const emptyAttraction = () => ({ name: '', kind: '', note: '' });

export default function AddBucketPlace({ items, onAdd, onClose, storage }) {
  const [mode, setMode] = useState('place');
  const [parentId, setParentId] = useState(items[0]?.id ?? '');
  const [url, setUrl] = useState('');
  const [draft, setDraft] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState(loadApiKey);
  const [showKey, setShowKey] = useState(false);

  const set = (k, v) => setDraft(d => ({ ...d, [k]: v }));
  const blank = () => (mode === 'attraction' ? emptyAttraction() : emptyPlace());

  async function fetchDetails() {
    const target = url.trim();
    if (!target) return;
    setBusy(true);
    setError(null);
    try {
      const text = extractPageContent(await fetchPageHtml(target));
      if (!text) throw new Error('PROXY');
      const got = await extractWithClaude({
        system: SYSTEM,
        prompt: buildPrompt(target, text, mode),
        apiKey,
      });
      // Never let a null from the model overwrite a field with the string "null".
      const clean = Object.fromEntries(
        Object.entries(got).map(([k, v]) => [k, v == null || v === 'null' ? '' : v]),
      );
      setDraft({ ...blank(), ...clean });
    } catch (e) {
      if (e.code === 'AUTH') {
        setShowKey(true);
        setError('Could not authenticate with the Anthropic API. Add a key below and retry, or fill the fields in by hand.');
        setDraft(d => d || blank());
      } else if (e.message === 'PROXY') {
        setError('Could not fetch that page — some sites block proxies. Fill the fields in by hand below.');
        setDraft(d => d || blank());
      } else {
        setError(e.message);
        setDraft(d => d || blank());
      }
    } finally {
      setBusy(false);
    }
  }

  function save() {
    if (!draft?.name?.trim()) return;
    const href = url.trim() || undefined;
    onAdd(mode === 'attraction'
      ? { kind: 'attraction', parentId, name: draft.name.trim(), attraction: { ...draft, href } }
      : { kind: 'place', ...draft, href });
    onClose();
  }

  const btn = (primary) => ({
    fontSize: 13, fontWeight: 700, borderRadius: 8, padding: '9px 14px', cursor: 'pointer',
    border: primary ? '1px solid #e0a03c' : '1px solid rgba(255,255,255,0.18)',
    background: primary ? '#e0a03c' : 'transparent',
    color: primary ? '#10140f' : '#eae8e2',
  });

  return (
    <div onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '5vh 16px', zIndex: 50, overflowY: 'auto' }}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#1a1f18', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 20, width: '100%', maxWidth: 520 }}>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <h2 style={{ margin: 0, fontSize: 18, color: '#fff' }}>Add to the list</h2>
          <span style={{ fontSize: 11.5, color: 'rgba(234,232,226,0.52)', marginLeft: 'auto' }}>
            {storage === 'shared' ? 'Saves to the shared list' : 'Saves in this browser'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
          {[['place', 'A new place'], ['attraction', 'Something to do']].map(([key, text]) => (
            <button key={key}
              onClick={() => { setMode(key); setDraft(null); }}
              style={{ ...btn(mode === key), fontSize: 12, padding: '6px 11px' }}>
              {text}
            </button>
          ))}
        </div>

        {mode === 'attraction' && (
          <label>
            <span style={label}>Add it to</span>
            <select value={parentId} onChange={e => setParentId(e.target.value)} style={field}>
              {items.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
            </select>
          </label>
        )}

        <label>
          <span style={label}>Link</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://…" style={{ ...field, flex: 1 }} />
            <button onClick={fetchDetails} disabled={busy || !url.trim()} style={{ ...btn(true), opacity: busy || !url.trim() ? 0.5 : 1 }}>
              {busy ? 'Reading…' : 'Fetch'}
            </button>
          </div>
        </label>

        {error && (
          <div style={{ marginTop: 10, fontSize: 12.5, color: '#e0a03c', lineHeight: 1.5 }}>{error}</div>
        )}

        {showKey && (
          <label>
            <span style={label}>Anthropic API key</span>
            <input type="password" value={apiKey} placeholder="sk-ant-…"
              onChange={e => { setApiKey(e.target.value); saveApiKey(e.target.value); }} style={field} />
          </label>
        )}

        {!draft && !busy && (
          <button onClick={() => setDraft(blank())}
            style={{ ...btn(false), marginTop: 12, fontSize: 12 }}>
            Skip the link — fill it in myself
          </button>
        )}

        {draft && (mode === 'attraction' ? (
          <>
            <Field name="Name" value={draft.name} onChange={v => set('name', v)} placeholder="Natural Bridge" />
            <Field name="Kind" value={draft.kind} onChange={v => set('kind', v)} placeholder="Arch, Trail, Museum…" />
            <Field name="Note" value={draft.note} onChange={v => set('note', v)} multiline placeholder="What it is and why go" />
          </>
        ) : (
          <>
            <Field name="Name" value={draft.name} onChange={v => set('name', v)} placeholder="The Hideaways" />
            <Field name="Tagline" value={draft.tagline} onChange={v => set('tagline', v)} placeholder="One short line" />
            <Field name="Location" value={draft.location} onChange={v => set('location', v)} placeholder="Town · Region" />
            <Field name="Type" value={draft.type} onChange={v => set('type', v)} placeholder="Cabin collection" />
            <Field name="Drive" value={draft.drive} onChange={v => set('drive', v)} placeholder="~4 hr from Cleveland" />
            <Field name="Season" value={draft.season} onChange={v => set('season', v)} placeholder="Best in October" />
            <Field name="Emoji" value={draft.emoji} onChange={v => set('emoji', v)} placeholder="🏕️" />
            <Field name="Why it makes the list" value={draft.why} onChange={v => set('why', v)} multiline />
          </>
        ))}

        <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
          <button onClick={save} disabled={!draft?.name?.trim()}
            style={{ ...btn(true), opacity: draft?.name?.trim() ? 1 : 0.5 }}>
            Add to list
          </button>
          <button onClick={onClose} style={btn(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
