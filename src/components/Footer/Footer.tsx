import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.section}>
          <h3>DeliverySathi</h3>
          <p>Delivering happiness to your doorstep</p>
        </div>
        <div className={styles.section}>
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
        </div>
        <div className={styles.section}>
          <h4>Contact Us</h4>
          <p>Email: support@deliverysathi.com</p>
          <p>Phone: +91 1234567890</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; 2024 DeliverySathi. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 