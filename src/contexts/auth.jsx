import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { api, createSession } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    if (recoveredUser !== "undefined") {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, [loading]);

  const login = async (email, password) => {
    const response = await createSession(email, password);
    //api criar uma session
    const loggedUser = {
      email: response.data.email,
      password: response.data.password,
    };
    const token = response.data.access_token;
    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("token", JSON.stringify(token));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUser(loggedUser);
    navigate("/");
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    setUser(null);
    navigate("/login");
  };
  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
