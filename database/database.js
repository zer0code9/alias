import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGb_I2_7ZUck1d02OS2O5-DjGA7cUSa6g",
  authDomain: "projectalias0.firebaseapp.com",
  projectId: "projectalias0",
  storageBucket: "projectalias0.appspot.com",
  messagingSenderId: "102308951235",
  appId: "1:102308951235:web:c13a1ad779851bec079e76",
  measurementId: "G-49EZSQSQ3L"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

module.exports = {
  app,
  analytics,
  db
}