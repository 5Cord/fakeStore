import React, { useEffect, useState } from 'react';
import styles from './ProductPage.module.css'; // Импортируем CSS-модуль
import { Link } from 'react-router-dom';

export default function ProductPage() {

  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch('https://66e5bacd5cc7f9b6273e31a2.mockapi.io/catalog')
      .then(response => response.json())
      .then(data => setProduct(data));
  }, []);

  const addToCart = (p) => {
    fetch('https://66e5bacd5cc7f9b6273e31a2.mockapi.io/cart', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(p),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product added to cart:', data);
      });
  };

  return (
    <div className={styles.productContainer}>
      {product.map(el => (
        <div key={el.id} className={styles.productCard}>
          <Link to={`/products/${el.id}`}>
            <div className={styles.imgCard}>
              <img src={el.imageUrl} alt={el.title} className={styles.productImage} />
            </div>
            <div className={styles.downBlockCard}>
              <div className={styles.productTitle}>{el.title}</div>
              <div className={styles.productDescription}>{el.description}</div>
              <div className={styles.productPrice}>{el.price} ₽</div>
              {/* Выводим дополнительные данные */}
              {el.CP && <div className={styles.productDetails}>Процессор: {el.CP}</div>}
              {el.VP && <div className={styles.productDetails}>Видеокарта: {el.VP}</div>}
              {el.RAM && <div className={styles.productDetails}>Оперативная память: {el.RAM}</div>}
              {el.MatherBoard && <div className={styles.productDetails}>Материнская плата: {el.MatherBoard}</div>}
              {el.SDD && <div className={styles.productDetails}>Накопитель: {el.SDD}</div>}
              {el.powerBlock && <div className={styles.productDetails}>Блок питания: {el.powerBlock}</div>}
              {el.Cooling && <div className={styles.productDetails}>Охлаждение: {el.Cooling}</div>}
            </div>
          </Link>
          <button className={styles.addToCart} onClick={() => addToCart(el)}>В корзину</button>
        </div>
      ))}
    </div>
  );
}
