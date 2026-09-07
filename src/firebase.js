/**
 * Firebase is optional. The page works without it — ticks fall back to
 * localStorage — so the site keeps running before the project is set up, and
 * a missing secret never breaks a deploy.
 *
 * The SDK is imported dynamically so its weight only lands on visitors when
 * sync is actually configured.
 *
 * Config comes from build-time env (see README). These values are public
 * identifiers, not secrets: what protects the data is the Firestore rules.
 */

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const syncEnabled = Boolean(config.apiKey && config.projectId && config.appId);

let loading;

/** Resolves to { auth, db, authApi, dbApi }, or null when unconfigured. */
export function getFirebase() {
  if (!syncEnabled) return Promise.resolve(null);

  loading ??= (async () => {
    const [{ initializeApp }, authApi, dbApi] = await Promise.all([
      import('firebase/app'),
      import('firebase/auth'),
      import('firebase/firestore'),
    ]);
    const app = initializeApp(config);
    return { auth: authApi.getAuth(app), db: dbApi.getFirestore(app), authApi, dbApi };
  })().catch(err => {
    loading = undefined; // let a later attempt retry rather than wedging
    throw err;
  });

  return loading;
}
