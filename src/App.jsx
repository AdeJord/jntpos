import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import POS from './pages/POS';
import Admin from './pages/Admin';

// Simplest possible App component
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

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