/**
 * Exports data to a CSV file
 * @param {Array} data - Array of objects to be exported
 * @param {String} filename - Name of the file
 */
export const exportToCSV = (data, filename) => {
    if (!data || !data.length) {
      console.error('No data to export');
      return;
    }
  
    // Get headers from the first object
    const headers = Object.keys(data[0]);
    
    // Create CSV rows
    const csvRows = [];
    
    // Add headers
    csvRows.push(headers.join(','));
    
    // Add data rows
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        
        // Handle strings with commas by wrapping in quotes
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        
        return value;
      });
      
      csvRows.push(values.join(','));
    }
    
    // Create CSV content
    const csvContent = csvRows.join('\n');
    
    // Create blob
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create download link
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    // Set up download link
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    // Add to document, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  /**
   * Formats order data for CSV export
   * @param {Array} orders - Array of order objects
   * @returns {Array} - Formatted array for CSV export
   */
  export const formatOrdersForCSV = (orders) => {
    return orders.map(order => {
      const date = new Date(order.timestamp);
      
      return {
        'Order ID': order.id,
        'Date': date.toLocaleDateString(),
        'Time': date.toLocaleTimeString(),
        'Items': order.items.map(item => `${item.name} (${item.quantity})`).join('; '),
        'Total': `£${order.total.toFixed(2)}`
      };
    });
  };
  
  export default {
    exportToCSV,
    formatOrdersForCSV
  };