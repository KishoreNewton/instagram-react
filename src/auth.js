import { useMutation } from '@apollo/react-hooks';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import React, { useState, useEffect, createContext } from 'react';
import { CREATE_USER } from './graphql/mutations';
import defaultUserImage from './images/default-user-image.jpg';

const provider = new firebase.auth.GoogleAuthProvider();

// Find these options in your Firebase console
firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  databaseURL: process.env.REACT_APP_FIREBASE_databaseURL,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_appId,
  measurementId: process.env.REACT_APP_FIREBASE_measurementId,
});
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
=======

>>>>>>> 88b44a5dedb6923f85525a06a3c93c62e94fe3bd
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({ status: 'loading' });
  const [createUser] = useMutation(CREATE_USER);
  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim =
          idTokenResult.claims['https://hasura.io/jwt/claims'];

        if (hasuraClaim) {
          setAuthState({ status: 'in', user, token });
        } else {
          // Check if refresh is required.
          const metadataRef = firebase
            .database()
            .ref('metadata/' + user.uid + '/refreshTime');

          metadataRef.on('value', async (data) => {
            if (!data.exists) return;
            // Force refresh to pick up the latest custom claims changes.
            const token = await user.getIdToken(true);
            setAuthState({ status: 'in', user, token });
          });
        }
      } else {
        setAuthState({ status: 'out' });
      }
    });
  }, []);

  async function signInWithGoogle() {
    await firebase.auth().signInWithPopup(provider);
  }

  async function signUpWithEmailAndPassword(formData) {
    const data = await firebase
      .auth()
      .createUserWithEmailAndPassword(
        formData.email,
        formData.password,
      );
    if (data.additionalUserInfo.isNewUser) {
      const variables = {
        userId: data.user.uid,
        name: formData.name,
        username: formData.username,
        email: data.user.email,
        bio: '',
        website: '',
        phoneNumber: '',
        profileImage: defaultUserImage,
      };
      await createUser({ variables });
    }
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 88b44a5dedb6923f85525a06a3c93c62e94fe3bd
  async function updateEmail(email) {
    await authState.user.updateEmail(email)
    console.log(authState.user)
  }

<<<<<<< HEAD
=======
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
=======
>>>>>>> 88b44a5dedb6923f85525a06a3c93c62e94fe3bd
  async function logInWithEmailAndPassword(email, password) {
    return await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 88b44a5dedb6923f85525a06a3c93c62e94fe3bd
  async function logInWithFacebook() {
    return await firebase.auth.FacebookAuthProvider()
  }

<<<<<<< HEAD
=======
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
=======
>>>>>>> 88b44a5dedb6923f85525a06a3c93c62e94fe3bd
  async function signOut() {
    setAuthState({ status: 'loading' });
    await firebase.auth().signOut();
    setAuthState({ status: 'out' });
  }

  if (authState.status === 'loading') {
    return null;
  } else {
    return (
      <AuthContext.Provider
        value={{
          authState,
          signInWithGoogle,
          signOut,
          signUpWithEmailAndPassword,
<<<<<<< HEAD
<<<<<<< HEAD
          logInWithEmailAndPassword,
          logInWithFacebook,
          updateEmail
=======
          logInWithEmailAndPassword
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
=======
          logInWithEmailAndPassword,
          logInWithFacebook,
          updateEmail
>>>>>>> 88b44a5dedb6923f85525a06a3c93c62e94fe3bd
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
