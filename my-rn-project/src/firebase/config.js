import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD9UuG2dF8IfEmSKsYEhaUMVLIrQPHiXq8",
    authDomain: "progra3-ec250.firebaseapp.com",
    projectId: "progra3-ec250",
    storageBucket: "progra3-ec250.firebasestorage.app",
    messagingSenderId: "827140977049",
    appId: "1:827140977049:web:79cd9c1f176826db77e308"
  };

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()