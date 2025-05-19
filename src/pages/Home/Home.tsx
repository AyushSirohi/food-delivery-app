import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Button from '../../components/Button/Button';

// Featured items data
const featuredItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella, basil, and olive oil',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500',
  },
  {
    id: 2,
    name: 'Chicken Burger',
    description: 'Grilled chicken patty with lettuce, tomato, and special sauce',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
  },
  {
    id: 3,
    name: 'Caesar Salad',
    description: 'Romaine lettuce, croutons, parmesan cheese, and Caesar dressing',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500',
  }
];

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <section className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1>Delicious Food Delivered To Your Doorstep</h1>
          <p>Order your favorite meals from our restaurant</p>
          <Link to="/menu" className={styles.orderButton}>
            Order Now
          </Link>
        </div>
      </section>

      <section className={styles.categories}>
        <h2>Food Categories</h2>
        <div className={styles.categoryList}>
          <div className={styles.category}>Burgers</div>
          <div className={styles.category}>Pizzas</div>
          <div className={styles.category}>Drinks</div>
          <div className={styles.category}>Desserts</div>
        </div>
      </section>

      <section className={styles.featured}>
        <h2>Featured Items</h2>
        <div className={styles.featuredGrid}>
          {featuredItems.map(item => (
            <div key={item.id} className={styles.featuredItem}>
              <img src={item.image} alt={item.name} className={styles.itemImage} />
              <div className={styles.itemInfo}>
                <h3>{item.name}</h3>
                <p className={styles.description}>{item.description}</p>
                <div className={styles.priceAndButton}>
                  <span className={styles.price}>₹{item.price.toFixed(2)}</span>
                  <Link to="/menu">
                    <Button>Order Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home; 