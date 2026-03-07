import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const provider = new GoogleAuthProvider();
  
const AuthProvider = ({ children }) => {
  const [loading, setLoaing] = useState(true);
  const [user, setuser] = useState(null);
  // create user sign up
  const creatUser = (email, password) => {
    setLoaing(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // sign in
  const signInUser = (email, password) => {
    setLoaing(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // sign out
    const signOutUser = () => {
      setLoaing(true)
    return signOut(auth);
  };
  // sign in with google
  const signInWithGoogle = () => {
    setLoaing(true)
    return signInWithPopup(auth,provider);
  }
  // observerv set
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setuser(currentUser);
      console.log('user in the auth  state change', currentUser)
      setLoaing(false);
    });
    return () => {
      unSubscribe;
    };
  }, []);

  const authInfo = {
    creatUser,
    signInUser,
    signOutUser,
    signInWithGoogle,
    loading,
    user,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};;

export default AuthProvider;
