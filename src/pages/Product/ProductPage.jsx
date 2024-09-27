import React, { useEffect, useState } from 'react';
import styles from './ProductPage.module.css'; // Импортируем CSS-модуль
Button
import { Link } from 'react-router-dom';

export default function ProductPage() {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('https://66e5bacd5cc7f9b6273e31a2.mockapi.io/catalog')
      .then(response => response.json())
      .then(data => setProduct(data));

    // Получение корзины при загрузке страницы
    fetch('https://66e5bacd5cc7f9b6273e31a2.mockapi.io/cart')
      .then(response => response.json())
      .then(data => setCart(data));
  }, []);

  const updateCart = (updatedItem) => {
    fetch(`https://66e5bacd5cc7f9b6273e31a2.mockapi.io/cart/${updatedItem.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })
      .then(response => response.json())
      .then(data => {
        setCart(prevCart => prevCart.map(item => item.id === data.id ? data : item));
      });
  };

  const addToCart = (p) => {
    const existingItem = cart.find(item => item.id === p.id);

    if (existingItem) {
      // Если товар уже в корзине, увеличиваем количество
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
      updateCart(updatedItem);
    } else {
      // Если товар не в корзине, добавляем его
      fetch('https://66e5bacd5cc7f9b6273e31a2.mockapi.io/cart', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...p, quantity: 1 }),
      })
        .then(response => response.json())
        .then(data => {
          setCart(prevCart => [...prevCart, data]);
        });
    }
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.hContainer}>
          <h4>Комплектации</h4>
          <h1>BOILING MACHINE SILVERs</h1>
        </div>
        <div className={styles.productContainer}>

          {product.map(el => (
            <div key={el.id} className={styles.productCard}>
              <Link to={`/products/${el.id}`}>
                <div className={styles.imgCard}>
                  <img src={el.imageUrl} alt={el.title} className={styles.productImage} />
                </div>
                <div className={styles.downBlockCard}>

                  <div className={styles.productTitle}>{el.title}</div>
                  <div className={styles.blockContainer}>
                    <div className={styles.productPrice}>{el.price} ₽</div>
                    <div className={styles.typePc}>{el.typePc}</div>
                  </div>

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
              <Button sx={{
                width: '100%',
              }} aria-label="add to shopping cart" onClick={() => addToCart(el)} variant="outlined">В корзину</Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


import { createContext, useContext } from "react";
import { Button } from '@mui/material';

const MyContext = createContext("without provider");

const External = () => {
  return (
    <MyContext.Provider value="Hello, i am External">
      <Intermediate />
    </MyContext.Provider>
  );
};

const Intermediate = () => {
  return <Internal />;
};

const Internal = () => {
  const context = useContext(MyContext);

  return `I am Internal component. I have got the message from External: "${context}"`;
};