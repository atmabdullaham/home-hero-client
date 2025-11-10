import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import app from "../firebase/firebase.config";
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   Create user with email and password
  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //  Sign in existing user with eamil and password
  const loginExistingUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //   logout an user
  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  //   Send a password reset email
  const passwordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  //   Authenticate Using Google with JavaScript
  const provider = new GoogleAuthProvider();
  const googleSignin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // update a user's profile
  const updateUserProfile = (updatedName, updatedPhoto) => {
    return updateProfile(auth.currentUser, {
      displayName: updatedName,
      photoURL: updatedPhoto,
    });
  };

  // Delete a user
  const deleteAccount = () => {
    return deleteUser(auth.currentUser);
  };

  //   an authentication state observer and get user data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createNewUser,
    loginExistingUser,
    logOutUser,
    passwordReset,
    googleSignin,
    updateUserProfile,
    deleteAccount,
    auth,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
