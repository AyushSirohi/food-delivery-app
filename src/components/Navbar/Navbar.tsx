import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useCart } from '../../context/CartContext';

const Navbar: React.FC = () => {
  const { getTotalItems } = useCart();

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        DeliverySathi
      </Link>
      <div className={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/cart" className={styles.cartLink}>
          Cart ({getTotalItems()})
        </Link>
      </div>
    </nav>
  );
};

export default Navbar; 