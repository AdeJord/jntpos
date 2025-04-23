import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import POS from './pages/POS';
import Admin from './pages/Admin';
import PwaDebug from './components/PwaDebug';

function App() {
  // Simple authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  // Debug mode state
  const [debugMode, setDebugMode] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    setIsAuthenticated(false);
  };
  
  // Enable debug mode with keyboard shortcut (Ctrl+Alt+D)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.altKey && e.key === 'd') {
        setDebugMode(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<POS onAdminAccess={handleLogin} />} />
        <Route 
          path="/admin" 
          element={
            isAuthenticated ? 
            <Admin onLogout={handleLogout} /> : 
            <Navigate to="/" replace />
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {debugMode && <PwaDebug />}
    </AppProvider>
  );
}

export default App;