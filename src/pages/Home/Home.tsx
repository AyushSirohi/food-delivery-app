import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const categories = [
    { id: 1, name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 2, name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 3, name: 'Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 4, name: 'Pasta', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  ];

  const featuredItems = [
    {
      id: 1,
      name: 'Margherita Pizza',
      description: 'Classic tomato sauce, mozzarella, and basil',
      price: 299,
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      name: 'Chicken Burger',
      description: 'Grilled chicken patty with fresh vegetables',
      price: 199,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 3,
      name: 'California Roll',
      description: 'Crab, avocado, and cucumber roll',
      price: 399,
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];

  return (
    <div className={styles.home}>
      <section className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1>Delicious Food Delivered To Your Doorstep</h1>
          <p>Order your favorite meals from the best restaurants in town</p>
          <Link to="/menu" className={styles.orderButton}>
            Order Now
          </Link>
        </div>
      </section>

      <section className={styles.categories}>
        <h2>Food Categories</h2>
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <Link to="/menu" key={category.id} className={styles.categoryCard}>
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.featured}>
        <h2>Featured Items</h2>
        <div className={styles.featuredGrid}>
          {featuredItems.map((item) => (
            <Link to="/menu" key={item.id} className={styles.featuredCard}>
              <img src={item.image} alt={item.name} />
              <div className={styles.featuredContent}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className={styles.featuredPrice}>
                  <span>₹{item.price}</span>
                  <button className={styles.addButton}>Add to Cart</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home; 