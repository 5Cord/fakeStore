import React, { useEffect, useState } from 'react'
import styles from './ProductPage.module.css'; // Импортируем CSS-модуль
import { useParams } from 'react-router-dom'

export default function ProductId() {
    const { id } = useParams();
    const [product, setProduct] = useState(null); // Инициализируем как объект

    useEffect(() => {
        fetch(`https://66e5bacd5cc7f9b6273e31a2.mockapi.io/catalog/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
    }, [id]);

    if (!product) {
        return <p>Загрузка...</p>;
    }

    return (
        <div className={styles.productContainer}>
            <div className={styles.productCard}>
                <img src={product.imageUrl} alt={product.title} className={styles.productImage} />
                <div className={styles.productTitle}>{product.title}</div>
                <div className={styles.productDescription}>{product.description}</div>
                <div className={styles.productPrice}>{product.price} ₽</div>
                <button onClick={() => addToCart(product)}>В корзину</button>
            </div>
        </div>
    )
}
