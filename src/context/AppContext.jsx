import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import initialMenuItems from '../data/initialMenuItems';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Load menu items from localStorage or use initial data
  const [menuItems, setMenuItems] = useState(() => {
    const savedMenuItems = localStorage.getItem('menuItems');
    return savedMenuItems ? JSON.parse(savedMenuItems) : initialMenuItems;
  });

  // Load orders from localStorage or use empty array
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Current order
  const [currentOrder, setCurrentOrder] = useState([]);
  
  // Currently active category
  const [activeCategory, setActiveCategory] = useState('Main Dishes');

  // Save menu items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
  }, [menuItems]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Add item to current order
  const addToOrder = (item) => {
    const existingItem = currentOrder.find(orderItem => orderItem.id === item.id);
    
    if (existingItem) {
      setCurrentOrder(currentOrder.map(orderItem => 
        orderItem.id === item.id 
          ? { ...orderItem, quantity: orderItem.quantity + 1 } 
          : orderItem
      ));
    } else {
      setCurrentOrder([...currentOrder, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from current order
  const removeFromOrder = (itemId) => {
    const existingItem = currentOrder.find(item => item.id === itemId);
    
    if (existingItem.quantity === 1) {
      setCurrentOrder(currentOrder.filter(item => item.id !== itemId));
    } else {
      setCurrentOrder(currentOrder.map(item => 
        item.id === itemId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ));
    }
  };

  // Clear the current order
  const clearOrder = () => {
    setCurrentOrder([]);
  };

  // Submit the current order
  const submitOrder = () => {
    if (currentOrder.length === 0) return;
    
    const newOrder = {
      id: uuidv4(),
      items: [...currentOrder],
      total: calculateTotal(),
      timestamp: new Date().toISOString(),
      status: 'submitted'
    };
    
    setOrders([...orders, newOrder]);
    clearOrder();
  };

  // Calculate the total for the current order
  const calculateTotal = () => {
    return currentOrder.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.quantity);
    }, 0);
  };

  // Add a new menu item
  const addMenuItem = (newItem) => {
    setMenuItems([...menuItems, { ...newItem, id: uuidv4() }]);
  };

  // Update an existing menu item
  const updateMenuItem = (updatedItem) => {
    setMenuItems(menuItems.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  // Delete a menu item
  const deleteMenuItem = (itemId) => {
    setMenuItems(menuItems.filter(item => item.id !== itemId));
  };

  // Export orders to CSV with improved format
  const exportOrdersToCSV = () => {
    if (orders.length === 0) return '';
    
    // Create better headers
    const headers = [
      'Order ID',
      'Date',
      'Time',
      'Item Name',
      'Quantity',
      'Price Each',
      'Item Total',
      'Order Total'
    ];
    
    // Create expanded rows with one item per row for better analysis
    const rows = [];
    
    orders.forEach(order => {
      const date = new Date(order.timestamp);
      const dateString = date.toLocaleDateString();
      const timeString = date.toLocaleTimeString();
      
      // For each order, create multiple rows (one per item)
      order.items.forEach((item, index) => {
        const row = [
          order.id,
          dateString,
          timeString,
          item.name,
          item.quantity,
          `£${parseFloat(item.price).toFixed(2)}`,
          `£${(parseFloat(item.price) * item.quantity).toFixed(2)}`,
        ];
        
        // Only include the order total on the first item row for each order
        if (index === 0) {
          row.push(`£${order.total.toFixed(2)}`);
        } else {
          row.push(''); // Empty cell for subsequent items in the same order
        }
        
        rows.push(row);
      });
      
      // Add a blank row between orders for better readability
      rows.push(Array(headers.length).fill(''));
    });
    
    // Remove the last empty row
    if (rows.length > 0) {
      rows.pop();
    }
    
    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => {
        // Properly escape fields with commas
        return row.map(field => {
          if (field && typeof field === 'string' && (field.includes(',') || field.includes('"'))) {
            return `"${field.replace(/"/g, '""')}"`;
          }
          return field;
        }).join(',');
      })
    ].join('\n');
    
    return csvContent;
  };

  return (
    <AppContext.Provider value={{
      menuItems,
      setMenuItems,
      orders,
      currentOrder,
      activeCategory,
      setActiveCategory,
      addToOrder,
      removeFromOrder,
      clearOrder,
      submitOrder,
      calculateTotal,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      exportOrdersToCSV
    }}>
      {children}
    </AppContext.Provider>
  );
};