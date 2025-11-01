
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDzxTbZBPZw0Icu2jjkbAXV2NP79cbP5Qc",
  authDomain: "parameter-ai.firebaseapp.com",
  projectId: "parameter-ai",
  storageBucket: "parameter-ai.appspot.com",
  messagingSenderId: "825302314829",
  appId: "1:825302314829:web:b15ddc194a4ee763e6d104",
  measurementId: "G-GX75SXD8CG"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseaAnalytics = getAnalytics(firebaseApp);
export const firebaseAuthInstance = getAuth(firebaseApp);

