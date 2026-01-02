import React, { createContext } from "react";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const createUser = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  const authData = { createUser };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
