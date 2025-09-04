import React, { createContext, useState, useEffect } from "react";
import { signin, signup, signout, getCurrentUser } from "../api/Auth.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch logged-in user on app load
  useEffect(() => {
    getCurrentUser()
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const handleSignin = async (email, password) => {
    const res = await signin(email, password);
    setUser(res.data.user);
    return res;
  };

  const handleSignup = async (fullName, email, password) => {
    const res = await signup(fullName, email, password);
    return res;
  };

  const handleSignout = async () => {
    await signout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleSignin, handleSignup, handleSignout }}>
      {children}
    </AuthContext.Provider>
  );
};
