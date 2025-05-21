import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddToCartNotification.module.css';

interface AddToCartNotificationProps {
  totalItems: number;
  totalPrice: number;
  onClose: () => void;
}

const AddToCartNotification: React.FC<AddToCartNotificationProps> = ({ totalItems, totalPrice, onClose }) => {
  const navigate = useNavigate();

  const handleViewCart = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <div className={styles.notification}>
      <div className={styles.content}>
        <div className={styles.itemInfo}>
          <h4>{totalItems} {totalItems === 1 ? 'Item' : 'Items'} in Cart</h4>
          <p>Total: ₹{totalPrice.toFixed(2)}</p>
        </div>
        <button className={styles.viewCartButton} onClick={handleViewCart}>
          View Cart
        </button>
      </div>
    </div>
  );
};

export default AddToCartNotification; 