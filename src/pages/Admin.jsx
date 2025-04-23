import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import MenuItemForm from '../components/MenuItemForm';
import ExportOrdersButton from '../components/ExportOrdersButton';

const Admin = ({ onLogout }) => {
  const navigate = useNavigate();
  const { 
    menuItems, 
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    orders
  } = useContext(AppContext);

  // State for active tab
  const [activeTab, setActiveTab] = useState('Main Dishes');
  
  // State for item being edited
  const [editingItem, setEditingItem] = useState(null);

  // Filter menu items by active tab/category
  const filteredItems = menuItems.filter(
    item => item.category === activeTab
  );

  // Get unique categories
  const categories = [...new Set(menuItems.map(item => item.category))];

  // Handle edit button click
  const handleEdit = (item) => {
    setEditingItem(item);
  };

  // Handle delete button click
  const handleDelete = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteMenuItem(itemId);
    }
  };

  // Handle return to POS
  const handleReturnToPOS = () => {
    navigate('/');
  };

  return (
    <div className="page-container">
      <header className="header">
        <h1 className="logo">Jerk N Thyme - Admin</h1>
        <button 
          className="logout-btn" 
          onClick={() => {
            onLogout();
            navigate('/');
          }}
          style={{ 
            position: 'absolute', 
            right: '1rem', 
            top: '1rem' 
          }}
        >
          Logout
        </button>
      </header>

      <div className="admin-dashboard">
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
        </div>

        <div className="admin-tabs">
          {categories.map(category => (
            <button
              key={category}
              className={`admin-tab ${activeTab === category ? 'active' : ''}`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <h3>Edit Menu Items</h3>
        <table className="menu-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price (£)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.price.toFixed(2)}</td>
                <td className="action-btns">
                  <button 
                    className="edit-btn"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Add New Item to {activeTab}</h3>
        <MenuItemForm 
          addMenuItem={addMenuItem}
          updateMenuItem={updateMenuItem}
          editingItem={editingItem}
          setEditingItem={setEditingItem}
          category={activeTab}
        />

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginTop: '2rem'
        }}>
          <ExportOrdersButton orders={orders} />
          <button 
            className="return-btn"
            onClick={handleReturnToPOS}
          >
            Return to POS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;