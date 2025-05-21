import React from 'react';
import { useOrders } from '../../context/OrderContext';
import styles from './ActiveOrders.module.css';

const ActiveOrders: React.FC = () => {
  const { orders, cancelOrder } = useOrders();
  const activeOrders = orders.filter(order => order.status === 'placed');

  if (activeOrders.length === 0) {
    return null;
  }

  return (
    <div className={styles.activeOrders}>
      <h3>Active Orders</h3>
      {activeOrders.map(order => {
        const timeElapsed = Date.now() - order.placedAt;
        const timeRemaining = Math.max(0, 120000 - timeElapsed);
        const minutes = Math.floor(timeRemaining / 60000);
        const seconds = Math.floor((timeRemaining % 60000) / 1000);

        return (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderInfo}>
              <p>Order #{order.id.slice(0, 6)}</p>
              <p>Delivery to: {order.deliveryAddress.address}</p>
              <p>Time remaining: {minutes}:{seconds.toString().padStart(2, '0')}</p>
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
  );
};

export default ActiveOrders; 