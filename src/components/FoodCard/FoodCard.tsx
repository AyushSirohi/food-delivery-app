import React from 'react';
import styles from './FoodCard.module.css';
import Button from '../Button/Button';

interface FoodCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  onAddToCart: (id: number) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({
  id,
  name,
  price,
  image,
  onAddToCart,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>${price.toFixed(2)}</p>
        <Button onClick={() => onAddToCart(id)}>Add to Cart</Button>
      </div>
    </div>
  );
};

export default FoodCard; 