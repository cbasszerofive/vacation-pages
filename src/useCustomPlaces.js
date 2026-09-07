import { useCallback, useEffect, useState } from 'react';
import { getFirebase, syncEnabled } from './firebase.js';

/**
 * Places added from the page itself, as opposed to the ones written into
 * BucketList.jsx by hand.
 *
 * Mirrors the visited list: shared through Firestore once signed in, otherwise
 * kept in this browser. An entry records who added it, so a shared list still
 * says where each place came from.
 */

const LOCAL_KEY = 'vacation-bucketlist-places';
const COLLECTION = 'places';

function loadLocal() {
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocal(list) {
  try {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
  } catch { /* private mode: this session only */ }
}

const newId = () =>
  `added-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export function useCustomPlaces(user) {
  const [local, setLocal] = useState(loadLocal);
  const [remote, setRemote] = useState(null);

  useEffect(() => {
    if (!user || !syncEnabled) return undefined;
    let unsub;
    let cancelled = false;

    getFirebase().then(fb => {
      if (cancelled || !fb) return;
      const { dbApi, db } = fb;
      unsub = dbApi.onSnapshot(
        dbApi.collection(db, COLLECTION),
        snap => setRemote(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
        err => console.error('places read failed', err),
      );
    });

    return () => { cancelled = true; if (unsub) unsub(); };
  }, [user]);

  const shared = user ? remote : null;
  const places = shared ?? local;
  const storage = shared ? 'shared' : 'local';

  const add = useCallback(async place => {
    const entry = {
      ...place,
      id: place.id || newId(),
      addedBy: user?.displayName || user?.email || null,
      addedAt: new Date().toISOString(),
    };

    if (!user || !syncEnabled) {
      setLocal(prev => {
        const next = [...prev, entry];
        saveLocal(next);
        return next;
      });
      return entry;
    }

    const { dbApi, db } = await getFirebase();
    await dbApi.setDoc(dbApi.doc(db, COLLECTION, entry.id), { ...entry, uid: user.uid });
    return entry;
  }, [user]);

  const remove = useCallback(async id => {
    if (!user || !syncEnabled) {
      setLocal(prev => {
        const next = prev.filter(p => p.id !== id);
        saveLocal(next);
        return next;
      });
      return;
    }
    const { dbApi, db } = await getFirebase();
    await dbApi.deleteDoc(dbApi.doc(db, COLLECTION, id));
  }, [user]);

  return { places, add, remove, storage, localCount: local.length };
}
