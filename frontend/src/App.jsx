import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import AppLayout from './layouts/AppLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ModulePage from './pages/ModulePage';
import Finance from './pages/Finance';
import Reports from './pages/Reports';
import AI from './pages/AI';
export default function App(){ const { user }=useAuth(); const [page,setPage]=useState('dashboard'); if(!user) return <Login/>; const component = page==='dashboard'?<Dashboard/>:page==='finance'?<Finance/>:page==='reports'?<Reports/>:page==='ai'?<AI/>:<ModulePage type={page}/>; return <AppLayout page={page} setPage={setPage}>{component}</AppLayout>; }
