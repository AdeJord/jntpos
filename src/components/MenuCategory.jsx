import React from 'react';

const MenuCategory = ({ category, activeCategory, setActiveCategory }) => {
  return (
    <button
      className={`category-btn ${activeCategory === category ? 'active' : ''}`}
      onClick={() => setActiveCategory(category)}
    >
      {category}
    </button>
  );
};

export default MenuCategory;