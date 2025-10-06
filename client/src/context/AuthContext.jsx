import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/taskApi";
import { setAuth, getToken, getUserFromStorage, clearAuth } from "./authStorage";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function useAuth(){ return useContext(AuthContext); }

export function AuthProvider({ children }){
  const [user, setUser] = useState(getUserFromStorage());
  const [token, setToken] = useState(getToken());
  const [loading, setLoading] = useState(false);
  const [logoutTimer, setLogoutTimer] = useState(null);

  useEffect(() => {
    // set auto logout based on token exp
    if(token){
      try {
        const payload = jwtDecode(token);
        const expMs = (payload.exp * 1000) - Date.now();
        if (expMs <= 0) { doLogout(); return; }

        if(logoutTimer) clearTimeout(logoutTimer);
        const t = setTimeout(() => doLogout(), expMs);
        setLogoutTimer(t);
      } catch {
        doLogout();
      }
    } else {
      if(logoutTimer) clearTimeout(logoutTimer);
      setLogoutTimer(null);
    }

    // cleanup on unmount
    return () => logoutTimer && clearTimeout(logoutTimer);
  }, [token]);

  function doLogout(){
    clearAuth();
    setToken(null);
    setUser(null);
    // redirect handled by Axios on 401 or app nav button
  }

  async function login(email, password){
    setLoading(true);
    try{
      const res = await axios.post("/api/auth/login", { email, password });
      const { token, username, role } = res.data;
      const userObj = { username, role, email };
      setAuth(token, userObj);
      setToken(token);
      setUser(userObj);
      setLoading(false);
      return { ok:true };
    }catch(e){
      setLoading(false);
      return { ok:false, error: e?.response?.data?.message || e.message };
    }
  }

  async function register(username,email,password){
    setLoading(true);
    try{
      const res = await axios.post("/api/auth/register", { username, email, password });
      const { token, username: uname, role } = res.data;
      const userObj = { username: uname, role, email };
      setAuth(token, userObj);
      setToken(token);
      setUser(userObj);
      setLoading(false);
      return { ok:true };
    }catch(e){
      setLoading(false);
      return { ok:false, error: e?.response?.data?.message || e.message };
    }
  }

  return (
    <AuthContext.Provider value={{
      user, token, loading, login, register, logout: doLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
}
