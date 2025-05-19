import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useCart } from '../../context/CartContext';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className={styles.cart}>
      <h1>Your Cart</h1>

      {items.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Your cart is empty</p>
          <Button onClick={() => navigate('/menu')}>Browse Menu</Button>
        </div>
      ) : (
        <>
          <div className={styles.cartItems}>
            {items.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  <p className={styles.price}>₹{item.price.toFixed(2)}</p>
                </div>
                <div className={styles.quantity}>
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <p className={styles.itemTotal}>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  className={styles.removeButton}
                  onClick={() => removeFromCart(item.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Tax (10%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <Button onClick={() => navigate('/checkout')}>Proceed to Checkout</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 