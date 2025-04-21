import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const firebaseConfig = {
    // Your Firebase config object from Firebase console
    // apiKey: 'YOUR_API_KEY',
    // authDomain: 'YOUR_AUTH_DOMAIN',
    // projectId: 'YOUR_PROJECT_ID',
    // storageBucket: 'YOUR_STORAGE_BUCKET',
    // messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    // appId: 'YOUR_APP_ID',

    apiKey: "AIzaSyAiM-9o3bQ-BC-UGH2hr4aAnlqfGmsxLDU",
    authDomain: "coffee-cocoa-database.appspot.com",
    databaseURL: "https://coffee-cocoa-database.firebaseio.com",
    projectId: "coffee-cocoa-database",
    storageBucket: "coffee-cocoa-database.firebasestorage.app",
    messagingSenderId: "39838192060",
    appId: "1:39838192060:web:63fe6d61fa881474625bb9",
    measurementId: "G-PVRM21E6EV"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firestore, storage };