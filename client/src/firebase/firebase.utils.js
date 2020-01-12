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

  export const createUserProfileDocument = async(userAuth,additionalData)=>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName,email} = userAuth;
      const createAt = new Date();
      try{
        await userRef.set({
          displayName,
          email,
          createAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating user',error.message);
      }
    }
    return userRef;
  };

  export const convertCollectionsSnapshotToMap = (collections) =>{
    const transformedCollection = collections.docs.map(doc => {
      const {title, items} = doc.data();
      return {
        routeName: encodeURI(title.toLowerCase()),
        id:doc.id,
        title,
        items
      }
    });
    return transformedCollection.reduce((accumulator,collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    },{});
  };

  export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) =>{
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef,obj);
    });

    return await batch.commit(); 
  };


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = ()=>auth.signInWithPopup(provider);

  export default firebase;