import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = "tm_token";
const USER_KEY = "tm_user";

export function setAuth(token, user){
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user || {}));
  // store expiration time for auto logout (in ms)
  try {
    const payload = jwtDecode(token);
    if (payload && payload.exp) {
      localStorage.setItem("tm_token_exp", String(payload.exp * 1000));
    }
  } catch {}
}

export function getToken(){
  const t = localStorage.getItem(TOKEN_KEY);
  if(!t) return null;
  const exp = Number(localStorage.getItem("tm_token_exp") || "0");
  if(exp && Date.now() > exp){
    clearAuth();
    return null;
  }
  return t;
}

export function getUserFromStorage(){
  const u = localStorage.getItem(USER_KEY);
  if(!u) return null;
  try { return JSON.parse(u); } catch { return null; }
}

export function clearAuth(){
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem("tm_token_exp");
}
