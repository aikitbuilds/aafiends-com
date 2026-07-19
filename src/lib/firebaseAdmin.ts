import type * as adminTypes from "firebase-admin";

let admin: typeof adminTypes;
try {
  // Use eval to hide the require from Turbopack so it doesn't try to bundle it or mangle the name
  admin = eval("require('firebase-admin')");
} catch (e) {
  console.error("Failed to dynamically require firebase-admin", e);
  throw e;
}

export { admin };

// The project the client mints ID tokens for. `verifyIdToken()` checks a
// token's `aud`/`iss` claims against this project id, so the Admin SDK MUST
// know it — otherwise every token is rejected as "Invalid or expired
// authentication token" even when it's fresh and valid. When we initialize
// with an explicit service-account cert the project id comes from the cert,
// but the credential-less ADC fallback (what runs in production, because
// ADMIN_SERVICE_ACCOUNT_KEY only lives in the local-only .env.local and is
// not shipped to the deployed backend) has no cert to read it from. Passing
// projectId explicitly makes verifyIdToken work under ADC too. NEXT_PUBLIC_*
// vars are inlined at build and remain available in process.env on the
// server at runtime; GOOGLE_CLOUD_PROJECT/GCLOUD_PROJECT are set by the
// Cloud Run/Functions runtime; the literal is a last-resort safety net.
const PROJECT_ID =
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  process.env.GOOGLE_CLOUD_PROJECT ||
  process.env.GCLOUD_PROJECT ||
  "gen-lang-client-0686783756";

if (!admin.apps.length) {
  try {
    const serviceAccountStr = process.env.ADMIN_SERVICE_ACCOUNT_KEY;
    console.log("Firebase admin init: ADMIN_SERVICE_ACCOUNT_KEY present?", !!serviceAccountStr);
    if (serviceAccountStr) {
      console.log("Firebase admin init: Attempting to parse service account...");
      const serviceAccount = JSON.parse(serviceAccountStr);
      console.log("Firebase admin init: Successfully parsed service account for project:", serviceAccount.project_id);
      if (serviceAccount.private_key) {
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
      }
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: serviceAccount.project_id || PROJECT_ID,
      });
      console.log("Firebase admin init: App initialized with cert");
    } else {
      // No service-account key in the runtime (the normal production case):
      // use Application Default Credentials but pin projectId so token
      // verification and Firestore both target the right project.
      console.log("Firebase admin init: Falling back to ADC initializeApp() with projectId:", PROJECT_ID);
      admin.initializeApp({ projectId: PROJECT_ID });
      console.log("Firebase admin init: App initialized with ADC fallback");
    }
  } catch (error) {
    console.error("Firebase admin: primary initialization failed", error);
    if (!admin.apps.length) {
      try {
        console.log("Firebase admin init: Attempting last-resort ADC fallback with projectId:", PROJECT_ID);
        admin.initializeApp({ projectId: PROJECT_ID });
        console.log("Firebase admin init: Last-resort fallback succeeded.");
      } catch (fallbackError) {
        console.error("Firebase admin: fallback initialization also failed", fallbackError);
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
export const adminAuth = new Proxy({} as adminTypes.auth.Auth, {
  get(_target, prop) {
    const auth = admin.auth();
    const value = (auth as any)[prop];
    return typeof value === "function" ? value.bind(auth) : value;
  },
});

export const adminDb = new Proxy({} as adminTypes.firestore.Firestore, {
  get(_target, prop) {
    const db = admin.firestore();
    const value = (db as any)[prop];
    return typeof value === "function" ? value.bind(db) : value;
  },
});
