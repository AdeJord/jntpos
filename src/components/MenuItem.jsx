import React from 'react';

const MenuItem = ({ item, onAdd }) => {
  return (
    <div className="menu-item">
      <div className="menu-item-header">
        <h3 className="menu-item-title">{item.name}</h3>
        <span className="menu-item-price">£{item.price.toFixed(2)}</span>
      </div>
      <p className="menu-item-desc">{item.description}</p>
      <button className="add-btn" onClick={onAdd}>+ Add</button>
    </div>
  );
};

export default MenuItem;