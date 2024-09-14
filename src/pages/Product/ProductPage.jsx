import React, { useEffect, useState } from 'react';
import styles from './ProductPage.module.css'; // Импортируем CSS-модуль

export default function ProductPage() {

  const [product, setProduct] = useState([]);


  useEffect(() => {
    fetch('https://66e5bacd5cc7f9b6273e31a2.mockapi.io/catalog')
      .then(response => response.json())
      .then(data => setProduct(data))
  }, [])

  const addToCart = (p) => {
    fetch('https://66e5bacd5cc7f9b6273e31a2.mockapi.io/cart', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify(p),
    }).then(response => response.json())
      .then(data => {
        console.log('Product added to cart:', data);
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
      });
  }

  return (
    <div className={styles.productContainer}>
      {product.map(el => (
        <div key={el.id} className={styles.productCard}>
          <img src={el.imageUrl} alt={el.title} className={styles.productImage} />
          <div className={styles.productTitle}>{el.title}</div>
          <div className={styles.productDescription}>{el.description}</div>
          <div className={styles.productPrice}>{el.price} ₽</div>
          <button onClick={() => addToCart(el)}>В корзину</button>
        </div>
      ))}
    </div>
  );
}
