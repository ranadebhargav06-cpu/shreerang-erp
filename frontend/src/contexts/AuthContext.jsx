import React, { createContext, useContext, useMemo, useState } from 'react';
import { api } from '../services/api';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('sp_erp_user') || 'null'));
  const login = async (email, password) => {
    const data = await api('/auth/login', { method:'POST', body:JSON.stringify({ email, password }) });
    localStorage.setItem('sp_erp_token', data.token); localStorage.setItem('sp_erp_user', JSON.stringify(data.user)); setUser(data.user);
  };
  const logout = () => { localStorage.removeItem('sp_erp_token'); localStorage.removeItem('sp_erp_user'); setUser(null); };
  const value = useMemo(()=>({ user, login, logout, hasRole:(roles)=>!roles || roles.includes(user?.role) }),[user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
