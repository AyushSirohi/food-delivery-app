import React, { useState } from 'react';
import styles from './Menu.module.css';
import Button from '../../components/Button/Button';
import { useCart } from '../../context/CartContext';

// Mock menu data
const menuItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella, basil, and olive oil',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500',
    category: 'Pizza'
  },
  {
    id: 2,
    name: 'Chicken Burger',
    description: 'Grilled chicken patty with lettuce, tomato, and special sauce',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
    category: 'Burgers'
  },
  {
    id: 3,
    name: 'Caesar Salad',
    description: 'Romaine lettuce, croutons, parmesan cheese, and Caesar dressing',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500',
    category: 'Salads'
  },
  {
    id: 4,
    name: 'Pasta Carbonara',
    description: 'Spaghetti with creamy sauce, bacon, and parmesan',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500',
    category: 'Pasta'
  }
];

const categories = ['All', 'Pizza', 'Burgers', 'Salads', 'Pasta'];

const Menu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className={styles.menu}>
      <h1>Our Menu</h1>

      <div className={styles.categories}>
        {categories.map(category => (
          <button
            key={category}
            className={`${styles.categoryButton} ${
              selectedCategory === category ? styles.active : ''
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.menuGrid}>
        {filteredItems.map(item => (
          <div key={item.id} className={styles.menuItem}>
            <img src={item.image} alt={item.name} className={styles.itemImage} />
            <div className={styles.itemInfo}>
              <h3>{item.name}</h3>
              <p className={styles.description}>{item.description}</p>
              <div className={styles.priceAndButton}>
                <span className={styles.price}>₹{item.price.toFixed(2)}</span>
                <Button onClick={() => addToCart(item)}>Add to Cart</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu; 