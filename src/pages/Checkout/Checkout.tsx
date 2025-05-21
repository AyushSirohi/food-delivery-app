import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Checkout.module.css';
import Button from '../../components/Button/Button';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addOrder({
      items: items.map(item => ({
        id: item.id.toString(),
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      deliveryAddress: formData
    });
    clearCart();
    navigate('/cart');
  };

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className={styles.checkout}>
      <h1>Checkout</h1>

      <div className={styles.checkoutGrid}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Delivery Information</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="zipCode">ZIP Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <Button type="submit">Place Order</Button>
        </form>

        <div className={styles.orderSummary}>
          <h2>Order Summary</h2>
          
          <div className={styles.items}>
            {items.map(item => (
              <div key={item.id} className={styles.summaryItem}>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemQuantity}>x{item.quantity}</span>
                </div>
                <span className={styles.itemPrice}>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.totals}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Tax (10%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className={`${styles.totalRow} ${styles.grandTotal}`}>
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 