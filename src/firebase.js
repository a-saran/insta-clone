import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBtQzgvbx-4Jmh8VX5S0_8rfaMH86Mb164",
  authDomain: "instagram-clone-cebf6.firebaseapp.com",
  databaseURL: "https://instagram-clone-cebf6.firebaseio.com",
  projectId: "instagram-clone-cebf6",
  storageBucket: "instagram-clone-cebf6.appspot.com",
  messagingSenderId: "83110779239",
  appId: "1:83110779239:web:5c464b03154e31f14377c2",
  measurementId: "G-98D1M9N23E"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
