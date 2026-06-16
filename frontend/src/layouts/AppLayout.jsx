import React from 'react';
import { useAuth } from '../contexts/AuthContext';
const nav = [
  ['dashboard','Dashboard'],['products','Products'],['customers','Customers'],['billing','Billing'],['sales','Sales'],['inventory','Inventory'],['purchases','Purchases'],['finance','Finance'],['reports','Reports'],['notifications','Notifications'],['ai','Future AI']
];
export default function AppLayout({ page, setPage, children }) {
  const { user, logout } = useAuth();
  return <div className="app"><aside className="sidebar"><div className="brand"><div className="brand-mark">SP</div><div><strong>Shreerang Papad</strong><div className="muted">Mahagaon, Yavatmal</div></div></div><nav className="nav">{nav.map(([id,label])=><button key={id} className={page===id?'active':''} onClick={()=>setPage(id)}>{label}</button>)}</nav></aside><main className="main"><div className="topbar"><div><h1>{nav.find(n=>n[0]===page)?.[1]}</h1><div className="muted">Integrated billing, inventory, accounts and analytics ERP</div></div><div className="actions"><span className="pill">{user?.role}</span><button onClick={logout}>Logout</button></div></div>{children}</main></div>;
}
