import React from 'react';
import styles from './ProductPage.module.css'; // Импортируем CSS-модуль

const product = [
  { id: 1, image: "https://avatars.mds.yandex.net/i?id=5c22df04a386e2be332cfa611ef1024a_l-5847755-images-thumbs&n=13", title: "Слот 1", description: 'Описание бла бла', price: 1200 },
  { id: 1, image: "https://avatars.mds.yandex.net/i?id=5c22df04a386e2be332cfa611ef1024a_l-5847755-images-thumbs&n=13", title: "Слот 1", description: 'Описание бла бла', price: 1200 },
  { id: 1, image: "https://avatars.mds.yandex.net/i?id=5c22df04a386e2be332cfa611ef1024a_l-5847755-images-thumbs&n=13", title: "Слот 1", description: 'Описание бла бла', price: 1200 },
  { id: 1, image: "https://avatars.mds.yandex.net/i?id=5c22df04a386e2be332cfa611ef1024a_l-5847755-images-thumbs&n=13", title: "Слот 1", description: 'Описание бла бла', price: 1200 }
];

export default function ProductPage() {
  return (
    <div className={styles.productContainer}>
      {product.map(el => (
        <div key={el.id} className={styles.productCard}>
          <img src={el.image} alt={el.title} className={styles.productImage} />
          <div className={styles.productTitle}>{el.title}</div>
          <div className={styles.productDescription}>{el.description}</div>
          <div className={styles.productPrice}>{el.price} ₽</div>
        </div>
      ))}
    </div>
  );
}
