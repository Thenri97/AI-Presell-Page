import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   databaseURL:import.meta.env.VITE_FIREBASE_DATABASE_URL,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_MESUAREMENT_ID
// };
const firebaseConfig = {
  apiKey: "AIzaSyB1B5DmUzHb1E4Qo5-JHNf8il1hytxH1xE",
  authDomain: "landing-page-ai-485d3.firebaseapp.com",
  databaseURL: "https://landing-page-ai-485d3-default-rtdb.firebaseio.com",
  projectId: "landing-page-ai-485d3",
  storageBucket: "landing-page-ai-485d3.appspot.com",
  messagingSenderId: "791498050103",
  appId: "1:791498050103:web:07aba704123b157abd8db2",
  measurementId: "G-63T8HHB9DZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };


