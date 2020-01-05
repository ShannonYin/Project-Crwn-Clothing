import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDrxc7k-lU9dPZUU1fqGX7gYHOC8DJ6QGE",
    authDomain: "crwn-db-8c81f.firebaseapp.com",
    databaseURL: "https://crwn-db-8c81f.firebaseio.com",
    projectId: "crwn-db-8c81f",
    storageBucket: "crwn-db-8c81f.appspot.com",
    messagingSenderId: "409100497101",
    appId: "1:409100497101:web:759775a66e162946f83984"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = ()=>auth.signInWithPopup(provider);

  export default firebase;