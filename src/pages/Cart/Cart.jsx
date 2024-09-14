import React, { useEffect, useState } from 'react';
import styles from './Cart.module.css'; // Если у вас есть стили для корзины

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetch('https://66e5bacd5cc7f9b6273e31a2.mockapi.io/cart')
            .then(res => res.json())
            .then(data => setCartItems(data))
            .catch(error => console.error('Error fetching cart data:', error));
    }, []);

    return (
        <div className={styles.cartContainer}>
            <h1>Корзина</h1>
            {cartItems.length === 0 ? (
                <p>Ваша корзина пуста</p>
            ) : (
                cartItems.map(item => (
                    <div key={item.id} className={styles.cartItem}>
                        <img src={item.imageUrl} alt={item.title} className={styles.cartImage} />
                        <div className={styles.cartTitle}>{item.title}</div>
                        <div className={styles.cartPrice}>{item.price} ₽</div>
                    </div>
                ))
            )}
        </div>
    );
}
