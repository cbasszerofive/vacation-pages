import { useCallback, useEffect, useState } from 'react';
import { getFirebase, syncEnabled } from './firebase.js';

/**
 * The visited list, in two modes.
 *
 * Signed out (or unconfigured): ticks live in localStorage, private to the
 * browser — the behaviour the page shipped with.
 *
 * Signed in: ticks live in one shared Firestore collection, so both of you see
 * the same list, and each tick records who made it. Local ticks are not
 * migrated automatically; `mergeLocal` offers that explicitly, so signing in
 * never silently rewrites shared history.
 */

const VISITED_KEY = 'vacation-bucketlist-visited';
const COLLECTION = 'visits';

// Firestore document ids cannot contain '/', and our keys are "item::name".
const docId = key => key.replace(/\//g, '__');

function loadLocal() {
  try {
    const raw = window.localStorage.getItem(VISITED_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function saveLocal(set) {
  try {
    window.localStorage.setItem(VISITED_KEY, JSON.stringify([...set]));
  } catch {
    // Private mode or blocked storage: ticks last for this session only.
  }
}

export function useVisits() {
  const [local, setLocal] = useState(loadLocal);
  const [remote, setRemote] = useState(null); // Map<key, {by, at}> once synced
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(syncEnabled ? 'connecting' : 'local');

  // Watch auth state.
  useEffect(() => {
    if (!syncEnabled) return;
    let cancelled = false;

    getFirebase()
      .then(fb => {
        if (cancelled || !fb) return;
        return fb.authApi.onAuthStateChanged(fb.auth, u => {
          if (cancelled) return;
          setUser(u);
          setStatus(u ? 'signed-in' : 'signed-out');
        });
      })
      .catch(err => {
        console.error('sync unavailable', err);
        if (!cancelled) setStatus('error');
      });

    return () => { cancelled = true; };
  }, []);

  // Subscribe to the shared list while signed in.
  useEffect(() => {
    if (!user) return undefined;
    let unsub;
    let cancelled = false;

    getFirebase().then(fb => {
      if (cancelled || !fb) return;
      const { dbApi, db } = fb;
      unsub = dbApi.onSnapshot(
        dbApi.collection(db, COLLECTION),
        snap => {
          const next = new Map();
          snap.forEach(d => next.set(d.data().key ?? d.id, d.data()));
          setRemote(next);
        },
        err => { console.error('sync read failed', err); setStatus('error'); },
      );
    });

    return () => { cancelled = true; if (unsub) unsub(); };
  }, [user]);

  // Derived rather than cleared in an effect: a stale snapshot from a previous
  // session must never be treated as the signed-in list.
  const shared = user ? remote : null;
  const signedIn = Boolean(user) && shared !== null;
  const visited = signedIn ? new Set(shared.keys()) : local;

  const toggle = useCallback(async key => {
    if (!user) {
      setLocal(prev => {
        const next = new Set(prev);
        if (next.has(key)) next.delete(key); else next.add(key);
        saveLocal(next);
        return next;
      });
      return;
    }

    const fb = await getFirebase();
    const { dbApi, db } = fb;
    const ref = dbApi.doc(db, COLLECTION, docId(key));
    try {
      if (shared?.has(key)) await dbApi.deleteDoc(ref);
      else await dbApi.setDoc(ref, {
        key,
        by: user.displayName || user.email || 'someone',
        uid: user.uid,
        at: dbApi.serverTimestamp(),
      });
    } catch (err) {
      console.error('sync write failed', err);
      setStatus('error');
    }
  }, [user, shared]);

  const signIn = useCallback(async () => {
    const fb = await getFirebase();
    if (!fb) return;
    const provider = new fb.authApi.GoogleAuthProvider();
    try {
      await fb.authApi.signInWithPopup(fb.auth, provider);
    } catch (err) {
      // Popups are blocked on some mobile browsers; redirect is the fallback.
      if (err?.code === 'auth/popup-blocked' || err?.code === 'auth/operation-not-supported-in-this-environment') {
        await fb.authApi.signInWithRedirect(fb.auth, provider);
        return;
      }
      console.error('sign-in failed', err);
      setStatus('error');
    }
  }, []);

  const signOut = useCallback(async () => {
    const fb = await getFirebase();
    if (fb) await fb.authApi.signOut(fb.auth);
  }, []);

  /** Copy this browser's ticks into the shared list, on request only. */
  const mergeLocal = useCallback(async () => {
    if (!user || !local.size) return;
    const fb = await getFirebase();
    const { dbApi, db } = fb;
    await Promise.all([...local].map(key => dbApi.setDoc(
      dbApi.doc(db, COLLECTION, docId(key)),
      { key, by: user.displayName || user.email || 'someone', uid: user.uid, at: dbApi.serverTimestamp() },
      { merge: true },
    )));
  }, [user, local]);

  return {
    visited,
    toggle,
    whoTicked: key => (signedIn ? shared.get(key)?.by : null),
    user,
    status,
    signedIn,
    signIn,
    signOut,
    localCount: local.size,
    mergeLocal,
  };
}
