import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import initialMenuItems from '../data/initialMenuItems';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Load menu items from localStorage or use initial data
  const [menuItems, setMenuItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMenuItems = localStorage.getItem('menuItems');
      return savedMenuItems ? JSON.parse(savedMenuItems) : initialMenuItems;
    }
    return initialMenuItems;
  });

  // Load orders from localStorage or use empty array
  const [orders, setOrders] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedOrders = localStorage.getItem('orders');
      return savedOrders ? JSON.parse(savedOrders) : [];
    }
    return [];
  });

  const [currentOrder, setCurrentOrder] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Main Dishes');

  // Save menu items to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('menuItems', JSON.stringify(menuItems));
    }
  }, [menuItems]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [orders]);

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

  const clearOrder = () => {
    setCurrentOrder([]);
  };

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

  const calculateTotal = () => {
    return currentOrder.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.quantity);
    }, 0);
  };

  const addMenuItem = (newItem) => {
    setMenuItems([...menuItems, { ...newItem, id: uuidv4() }]);
  };

  const updateMenuItem = (updatedItem) => {
    setMenuItems(menuItems.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  const deleteMenuItem = (itemId) => {
    setMenuItems(menuItems.filter(item => item.id !== itemId));
  };

  const exportOrdersToCSV = () => {
    if (orders.length === 0) return '';
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
    const rows = [];

    orders.forEach(order => {
      const date = new Date(order.timestamp);
      const dateString = date.toLocaleDateString();
      const timeString = date.toLocaleTimeString();

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
        row.push(index === 0 ? `£${order.total.toFixed(2)}` : '');
        rows.push(row);
      });

      rows.push(Array(headers.length).fill(''));
    });

    if (rows.length > 0) rows.pop();

    const csvContent = [
      headers.join(','),
      ...rows.map(row =>
        row.map(field =>
          (typeof field === 'string' && (field.includes(',') || field.includes('"')))
            ? `"${field.replace(/"/g, '""')}"`
            : field
        ).join(',')
      )
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
