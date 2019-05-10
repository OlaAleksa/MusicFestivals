import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyDU3s_BNaA8VuCNb7zSD2hOn2mCPRCdIr4",
    authDomain: "festivals-368dd.firebaseapp.com",
    databaseURL: "https://festivals-368dd.firebaseio.com",
    projectId: "festivals-368dd",
    storageBucket: "festivals-368dd.appspot.com",
    messagingSenderId: "544131047532"
};
firebase.initializeApp(config);
export default firebase;