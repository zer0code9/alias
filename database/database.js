const { firebase } = require("./../secure.json");
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getAuth, signInWithEmailAndPassword, onAuthStateChanged } = require("firebase/auth");

const app = initializeApp(firebase.firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

signInWithEmailAndPassword(auth, firebase.email, firebase.pass)
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