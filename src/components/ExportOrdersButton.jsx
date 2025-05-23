import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ExportOrdersButton = () => {
  const { exportOrdersToCSV, orders } = useContext(AppContext);

  const handleExport = () => {
    if (orders.length === 0) {
      alert('No orders to export');
      return;
    }

    // Generate CSV content
    const csvContent = exportOrdersToCSV();
    
    // Create blob
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create download link
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    // Set up download link with more descriptive filename
    const dateStr = new Date().toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '-');
    
    link.setAttribute('href', url);
    link.setAttribute('download', `jerk_n_thyme_orders_${dateStr}.csv`);
    link.style.visibility = 'hidden';
    
    // Add to document, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button 
      className="export-btn"
      onClick={handleExport}
      disabled={orders.length === 0}
    >
      Export Orders to CSV
    </button>
  );
};

export default ExportOrdersButton;