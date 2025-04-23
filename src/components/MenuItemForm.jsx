import React, { useState, useEffect } from 'react';

const MenuItemForm = ({ addMenuItem, updateMenuItem, editingItem, setEditingItem, category }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: category
  });

  // Update form data when editingItem or category changes
  useEffect(() => {
    if (editingItem) {
      setFormData({
        id: editingItem.id,
        name: editingItem.name,
        description: editingItem.description,
        price: editingItem.price.toString(),
        category: editingItem.category
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        category: category
      });
    }
  }, [editingItem, category]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.description || !formData.price) {
      alert('Please fill in all fields');
      return;
    }
    
    // Create item object
    const itemData = {
      ...formData,
      price: parseFloat(formData.price)
    };
    
    // If editing, update existing item
    if (editingItem) {
      updateMenuItem(itemData);
      setEditingItem(null);
    } else {
      // Otherwise add new item
      addMenuItem(itemData);
    }
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      price: '',
      category: category
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: category
    });
  };

  return (
    <div className="add-item-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="price">Price (£)</label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
          />
        </div>
        
        <div className="form-group">
          <label>Category: {category}</label>
          <input
            type="hidden"
            name="category"
            value={category}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          {editingItem && (
            <button
              type="button"
              style={{
                backgroundColor: '#ccc',
                border: 'none',
                padding: '0.75rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
          
          <button 
            type="submit" 
            className="add-item-btn"
          >
            {editingItem ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuItemForm;