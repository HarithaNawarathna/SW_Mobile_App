import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA_pIxQ3OHBidDKw3mn6cFYRNa_QRVNVN4",
    authDomain: "epiceventify-8f8dd.firebaseapp.com",
    projectId: "epiceventify-8f8dd",
    storageBucket: "epiceventify-8f8dd.appspot.com",
    messagingSenderId: "411551967040",
    appId: "1:411551967040:web:f4f3e91a8bd134fac7bca5",
    measurementId: "G-QJCWGM36ZH"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };