import React from 'react';

const OrderSummary = ({ order, total, onRemove, onSubmit }) => {
  return (
    <div className="order-section">
      <h2 className="order-header">Current Order</h2>
      
      {order.length === 0 ? (
        <div className="empty-order">
          <p>No items in order yet.</p>
        </div>
      ) : (
        <>
          <div className="order-items">
            {order.map(item => (
              <div key={item.id} className="order-item">
                <div>
                  <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                  <span style={{ marginLeft: '0.5rem' }}>x{item.quantity}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span>£{(item.price * item.quantity).toFixed(2)}</span>
                  <button 
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: 'var(--danger)',
                      cursor: 'pointer',
                      fontSize: '1.2rem'
                    }}
                    onClick={() => onRemove(item.id)}
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-total">
            <p>Total: £{total.toFixed(2)}</p>
          </div>
          
          <button 
            className="submit-order"
            onClick={onSubmit}
          >
            Submit Order
          </button>
        </>
      )}
    </div>
  );
};

export default OrderSummary;