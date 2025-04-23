/**
 * Get item from localStorage with error handling
 * @param {String} key - Key to retrieve
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} - Parsed value or default value
 */
export const getStorageItem = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      
      // If item doesn't exist, return default value
      if (item === null) {
        return defaultValue;
      }
      
      // Try to parse item
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return defaultValue;
    }
  };
  
  /**
   * Set item in localStorage with error handling
   * @param {String} key - Key to set
   * @param {any} value - Value to store
   */
  export const setStorageItem = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
    }
  };
  
  /**
   * Remove item from localStorage with error handling
   * @param {String} key - Key to remove
   */
  export const removeStorageItem = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  };
  
  /**
   * Clear all data from localStorage with error handling
   */
  export const clearStorage = () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };
  
  export default {
    getStorageItem,
    setStorageItem,
    removeStorageItem,
    clearStorage
  };