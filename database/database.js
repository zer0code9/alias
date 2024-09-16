const { database } = require("./../config");
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, collection } = require("firebase/firestore");
const { getAuth, signInWithEmailAndPassword, onAuthStateChanged } = require("firebase/auth");

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
const db = getFirestore(app);
const auth = getAuth();

signInWithEmailAndPassword(auth, database.email, database.pass)
    .then((userCred) => {
        console.log("Signed in as " + userCred.user.uid);
    })
    .catch((error) => {
        console.log("Unable to sign in");
    })

onAuthStateChanged(auth, (user) => {
    if (!user) console.log("Signed out");
})

module.exports = {
    db
}