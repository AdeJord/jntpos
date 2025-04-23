import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none'
      });
      console.log('Service Worker registered with scope:', registration.scope);
      
      // Force update check on each page load
      registration.update();
      
      // Handle installation event
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Store the event so it can be triggered later
        window.deferredPrompt = e;
        console.log('Install prompt captured and ready');
      });
      
      // Track installation success
      window.addEventListener('appinstalled', (evt) => {
        console.log('App was installed successfully');
      });
      
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);