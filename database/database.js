const { firebase } = require("./../secure.json");
const { getAuth, signInWithEmailAndPassword, onAuthStateChanged } = require("firebase/auth");
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getAI, getGenerativeModel, GoogleAIBackend } = require("firebase/ai")

const appDB = initializeApp(firebase.firebaseDBConfig, "DB");
const db = getFirestore(appDB);

const authDB = getAuth(appDB);

const appAI = initializeApp(firebase.firebaseAIConfig, "AI");
const ai = getAI(appAI, { backend: new GoogleAIBackend() });
const model = getGenerativeModel(ai, { model: "gemini-2.0-flash" });

signInWithEmailAndPassword(authDB, firebase.email, firebase.pass)
    .then((userCred) => {
        console.log("Signed in as " + userCred.user.displayName);
    })
    .catch((error) => {
        console.log("Unable to sign in");
    })

onAuthStateChanged(authDB, (user) => {
    if (!user) console.log("Signed out");
})

module.exports = {
    db,
    model
}