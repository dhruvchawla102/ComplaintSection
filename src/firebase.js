import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
        apiKey: "Put your own ones",
        authDomain: "Put your own ones",
        databaseURL: "Put your own ones",
        projectId: "Put your own ones",
        storageBucket: "Put your own ones",
        messagingSenderId: "Put your own ones",
        appId: "Put your own ones",
        measurementId: "Put your own ones"
})

const db = firebaseApp.firestore();

export default db; 