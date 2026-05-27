import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

// Safely probe for local firebase config dynamic container using Vite's fallback resolver
// This avoids build time hard errors on production/CI systems if firebase-applet-config.json is absent
const configs = import.meta.glob('./firebase-applet-config.json', { eager: true });
const configKeys = Object.keys(configs);
const localFirebaseConfig: any = configKeys.length > 0 ? (configs[configKeys[0]] as any).default || configs[configKeys[0]] : {};

// Support modern secure environment variables for production environments
// If not specified, fall back safely to the local configurations file (ignored in git)
const rawConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || localFirebaseConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || localFirebaseConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || localFirebaseConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || localFirebaseConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || localFirebaseConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || localFirebaseConfig.appId,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || localFirebaseConfig.firestoreDatabaseId,
};

// Check if credentials are valid to prevent app startup crash in public production deployments
const isConfigValid = !!(rawConfig.apiKey && rawConfig.projectId && rawConfig.apiKey !== 'your_firebase_api_key_here');

const firebaseConfig = isConfigValid ? rawConfig : {
  apiKey: "AIzaSyPlaceholderKeysToPreventCrashesOnPublicBuilds",
  authDomain: "placeholder-project.firebaseapp.com",
  projectId: "placeholder-project",
  storageBucket: "placeholder-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
  firestoreDatabaseId: undefined
};

if (!isConfigValid) {
  console.warn("Firebase configuration was incomplete or missing. Falling back to placeholder configuration to prevent startup crashes. Define VITE_FIREBASE_API_KEY etc to run with Firestore.");
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

// Validate Connection to Firestore on initial boot
async function testConnection() {
  if (!isConfigValid) return;
  try {
    await getDocFromServer(doc(db, 'site_settings', 'active'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration or network status.");
    }
  }
}
testConnection();

