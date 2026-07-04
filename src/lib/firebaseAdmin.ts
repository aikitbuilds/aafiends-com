import * as admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    const serviceAccountStr = process.env.ADMIN_SERVICE_ACCOUNT_KEY;
    if (serviceAccountStr) {
      const serviceAccount = JSON.parse(serviceAccountStr);
      if (serviceAccount.private_key) {
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
      }
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      // Fallback for local dev if ADC is available, or just throw
      admin.initializeApp();
    }
  } catch (error) {
    console.error("Firebase admin: primary initialization failed", error);
    // Last-resort fallback so a bad/missing ADMIN_SERVICE_ACCOUNT_KEY doesn't
    // leave zero apps registered. If this also fails, admin.apps.length
    // stays 0 and the proxies below will throw when actually used - but
    // only inside a request handler's own try/catch (see comment below),
    // never at import time.
    if (!admin.apps.length) {
      try {
        admin.initializeApp();
      } catch (fallbackError) {
        console.error("Firebase admin: fallback initialization also failed - all auth/db calls will fail until env vars are fixed", fallbackError);
      }
    }
  }
}

// Previously `adminAuth = admin.auth()` and `adminDb = admin.firestore()`
// ran eagerly at module scope. If initialization above failed for any
// reason, those calls threw immediately at import time - before any API
// route's own try/catch could run - which crashed the whole serverless
// function and returned a raw, non-JSON "Internal Server Error" from the
// hosting layer. The client's response.json() call then failed with the
// cryptic "Unexpected token 'I', 'Internal S'... is not valid JSON" (bug
// reported 2026-07-03). Wrapping in a Proxy defers the admin.auth()/
// admin.firestore() call to first actual use, so any failure surfaces
// inside the route handler's own try/catch and comes back as a normal JSON
// error response instead.
export const adminAuth = new Proxy({} as admin.auth.Auth, {
  get(_target, prop) {
    const auth = admin.auth();
    const value = (auth as any)[prop];
    return typeof value === "function" ? value.bind(auth) : value;
  },
});

export const adminDb = new Proxy({} as admin.firestore.Firestore, {
  get(_target, prop) {
    const db = admin.firestore();
    const value = (db as any)[prop];
    return typeof value === "function" ? value.bind(db) : value;
  },
});
