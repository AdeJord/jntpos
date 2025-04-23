import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import POS from './pages/POS';
import Admin from './pages/Admin';

function App() {
  // Simple authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

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
    </AppProvider>
  );
}


export default App;