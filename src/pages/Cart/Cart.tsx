import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const { orders, cancelOrder } = useOrders();
  const activeOrders = orders.filter(order => order.status === 'placed');

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className={styles.cart}>
      <h1>Your Cart</h1>

      {activeOrders.length > 0 && (
        <div className={styles.activeOrders}>
          <h2>Active Orders</h2>
          {activeOrders.map(order => {
            const timeElapsed = Date.now() - order.placedAt;
            const timeRemaining = Math.max(0, 120000 - timeElapsed);
            const minutes = Math.floor(timeRemaining / 60000);
            const seconds = Math.floor((timeRemaining % 60000) / 1000);

            return (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderInfo}>
                  <h3>Order #{order.id.slice(0, 6)}</h3>
                  <p>Delivery to: {order.deliveryAddress.address}</p>
                  <p>Time remaining: {minutes}:{seconds.toString().padStart(2, '0')}</p>
                  <div className={styles.orderItems}>
                    {order.items.map(item => (
                      <div key={item.id} className={styles.orderItem}>
                        <span>{item.name}</span>
                        <span>x{item.quantity}</span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className={styles.cancelButton}
                  onClick={() => cancelOrder(order.id)}
                >
                  Cancel Order
                </button>
              </div>
            );
          })}
        </div>
      )}

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