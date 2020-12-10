
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const appFirebase = firebase.initializeApp({
    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID,
    // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    apiKey: "AIzaSyBgJn9wt5H-1h_1PhG2qd77ZMv3lHVztQQ",
    authDomain: "fir-tutorial-bb666.firebaseapp.com",
    databaseURL: "https://fir-tutorial-bb666.firebaseio.com",
    projectId: "fir-tutorial-bb666",
    storageBucket: "fir-tutorial-bb666.appspot.com",
    messagingSenderId: "1035684874372",
    appId: "1:1035684874372:web:589c108119e668d81d5ad1",
    measurementId: "G-GPGHC7HWDS"
});

export const auth = appFirebase.auth();
export const storage = appFirebase.storage();
export const db = appFirebase.firestore();

export const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider).then(function(result) {
    }).catch(function(error) {
        return error
    });
}
export const loginWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider).then(function(result) {
    }).catch(function(error) {
        return error
    });
}

export default appFirebase;