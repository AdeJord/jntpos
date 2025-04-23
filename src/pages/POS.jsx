// Admin password modal state
const [showAdminModal, setShowAdminModal] = useState(false);
const [password, setPassword] = useState('');
const [error, setError] = useState('');import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import MenuItem from '../components/MenuItem';
import MenuCategory from '../components/MenuCategory';
import OrderSummary from '../components/OrderSummary';

const POS = ({ onAdminAccess }) => {
const navigate = useNavigate();
const { 
  menuItems, 
  activeCategory,
  setActiveCategory,
  currentOrder,
  addToOrder,
  removeFromOrder,
  submitOrder,
  calculateTotal
} = useContext(AppContext);

// Admin password modal state
const [installPrompt, setInstallPrompt] = useState(null);

// Capture the install prompt event
useEffect(() => {
  const handleBeforeInstallPrompt = (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    setInstallPrompt(e);
  };

  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  
  return () => {
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  };
}, []);

// Handle installation button click
const handleInstallClick = () => {
  if (!installPrompt) {
    alert('Installation not available. Please make sure you are using a supported browser and the site is not already installed.');
    return;
  }
  
  // Show the installation prompt
  installPrompt.prompt();
  
  // Wait for the user to respond to the prompt
  installPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    setInstallPrompt(null);
  });
};

// Filter menu items by active category
const filteredItems = menuItems.filter(
  item => item.category === activeCategory
);

// Get unique categories
const categories = [...new Set(menuItems.map(item => item.category))];

// Handle admin access
const handleAdminAccess = () => {
  setShowAdminModal(true);
};

// Handle password submission
const handlePasswordSubmit = (e) => {
  e.preventDefault();
  // Simple password check - in a real app, use secure authentication
  if (password === 'admin123') {
    onAdminAccess();
    navigate('/admin');
  } else {
    setError('Incorrect password');
  }
};

return (
  <div className="page-container">
    <header className="header">
      <h1 className="logo">Jerk n Thyme</h1>
      <p className="tagline">Authentic Jamaican Cuisine</p>
      <div style={{ position: 'absolute', right: '1rem', top: '1rem', display: 'flex', gap: '0.5rem' }}>
        {installPrompt && (
          <button 
            style={{ 
              backgroundColor: '#FFFF00',
              color: '#000000',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={handleInstallClick}
          >
            Install App
          </button>
        )}
        <button 
          className="admin-access-btn"
          style={{ 
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px'
          }}
          onClick={handleAdminAccess}
        >
          Admin Access
        </button>
      </div>
    </header>

    <div className="main-content">
      <div className="menu-section">
        <h2 className="menu-header">Menu</h2>
        
        <div className="categories">
          {categories.map(category => (
            <MenuCategory 
              key={category}
              category={category}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          ))}
        </div>
        
        <div className="menu-items">
          {filteredItems.map(item => (
            <MenuItem 
              key={item.id}
              item={item}
              onAdd={() => addToOrder(item)}
            />
          ))}
        </div>
      </div>

      <OrderSummary 
        order={currentOrder}
        total={calculateTotal()}
        onRemove={removeFromOrder}
        onSubmit={submitOrder}
      />
    </div>

    {/* Admin Login Modal */}
    {showAdminModal && (
      <div className="modal-overlay" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div className="modal" style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '2rem',
          width: '300px'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>Admin Access</h3>
          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button
                type="button"
                style={{
                  backgroundColor: '#ccc',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onClick={() => setShowAdminModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  backgroundColor: 'var(--jamaican-green)',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);
};

export default POS;