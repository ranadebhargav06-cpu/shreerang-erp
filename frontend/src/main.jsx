import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import './styles/app.css';
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/service-worker.js'));
createRoot(document.getElementById('root')).render(<AuthProvider><App /></AuthProvider>);
