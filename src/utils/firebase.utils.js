import {initializeApp} from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAGqzuihwoabTwQVy9vLkb7v9_3ZTv-YfI',
  authDomain: 'authentication-react-9264a.firebaseapp.com',
  projectId: 'authentication-react-9264a',
  storageBucket: 'authentication-react-9264a.appspot.com',
  messagingSenderId: '437511898156',
  appId: '1:437511898156:web:c094271bc909c3cfefbd89',
};

/**
* Initialize Firebase
*/
const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const auth = getAuth();

/**
* Logs in user with valid email and password
* @param {string} email - Email Address
* @param {string} password - Password
* @returns {Object} - User object from Firebase Authentication
*/

export const logInWithEmailAndPass = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
* Create user with valid email and password
* @param {string} email - Email Address
* @param {string} password - Password
* @returns {Object} - User object from Firebase Authentication
*/

export const signUpWithEmailAndPass = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  signOut(auth);
};

export const storage = getStorage(app);

/**
* Create user document in firestore
* @param {Object} userAuth - User authentication object given by signUp method
* @param {Object} additionalInfo - Any other info can be passed to object
* Check if user already exists then make the user
*/

export const createUserDocumentwithAuth = async (userAuth, additionalInfo) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const {email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (e) {
      console.log('There was an error creating the User', e.message);
    }
  }

  return userDocRef;
};

/**
* Gets user document from firestore
* @param {Object} currentUser - User object saved in UserContext
*/

export const getUserDataWithAuth = async (currentUser) => {
  if (!currentUser) return;
  console.log(currentUser);
  const userDocRef = doc(db, 'users', currentUser.uid);

  try {
    const userSnapShot = await getDoc(userDocRef);
    if (userSnapShot.exists()) {
      return userSnapShot.data();
    } else {
      alert('User does not exist');
    }
  } catch (error) {
    console.log(error);
  }
};

export const onAuthChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
