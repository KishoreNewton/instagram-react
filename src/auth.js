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

  async function updateEmail(email) {
    await authState.user.updateEmail(email)
    console.log(authState.user)
  }

  async function logInWithEmailAndPassword(email, password) {
    return await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  }

  async function logInWithFacebook() {
    return await firebase.auth.FacebookAuthProvider()
  }

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
          logInWithEmailAndPassword,
          logInWithFacebook,
          updateEmail
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
