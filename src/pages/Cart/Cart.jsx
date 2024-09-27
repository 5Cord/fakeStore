import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent, CardActions, TextField, Box } from '@mui/material';
import styles from './Cart.module.css'; // Если у вас есть стили для корзины

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: ''
    });

    useEffect(() => {
        fetch('https://66e5bacd5cc7f9b6273e31a2.mockapi.io/cart')
            .then(res => res.json())
            .then(data => setCartItems(data));
    }, []);

    // Группировка товаров по id и подсчет их общего количества
    const groupedItems = cartItems.reduce((acc, item) => {
        if (!acc[item.id]) {
            acc[item.id] = { ...item, quantity: 0 };
        }
        acc[item.id].quantity += item.quantity;
        return acc;
    }, {});

    const itemsList = Object.values(groupedItems);
    const finalPrice = itemsList.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const deleteFromCart = (id) => {
        fetch(`https://66e5bacd5cc7f9b6273e31a2.mockapi.io/cart/${id}`, {
            method: 'DELETE',
        }).then(() => {
            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
        });
    };

    const updateQuantity = (id, delta) => {
        const updatedItems = itemsList.map(item => {
            if (item.id === id) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) };
            }
            return item;
        });
        setCartItems(updatedItems);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь можно добавить логику для отправки данных формы
        console.log(formData);
    };

    return (
        <Container className={styles.cartContainer} maxWidth="md">
            <Typography variant="h4" gutterBottom align="center">
                Корзина
            </Typography>
            {itemsList.length === 0 ? (
                <Typography variant="h6" align="center">
                    Ваша корзина пуста
                </Typography>
            ) : (
                <Box>
                    {itemsList.map(item => (
                        <Card key={item.id} sx={{ marginBottom: 2 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={item.imageUrl}
                                alt={item.title}
                            />
                            <CardContent>
                                <Typography variant="h6">{item.title}</Typography>
                                <Typography variant="body1">{item.price} ₽</Typography>
                                <div className={styles.quantityControl}>
                                    <Button onClick={() => updateQuantity(item.id, -1)}>-</Button>
                                    <span className={styles.quantity}>{item.quantity}</span>
                                    <Button onClick={() => updateQuantity(item.id, 1)}>+</Button>
                                </div>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="secondary"
                                    onClick={() => deleteFromCart(item.id)}
                                >
                                    Удалить
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                    <Typography variant="h4" align="right">
                        Итог: {finalPrice} ₽
                    </Typography>
                </Box>
            )}

            {/* Форма для оформления заказа */}
            <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
                <Typography variant="h5" gutterBottom>
                    Оформление заказа
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Имя"
                            variant="outlined"
                            fullWidth
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Фамилия"
                            variant="outlined"
                            fullWidth
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Номер телефона"
                            variant="outlined"
                            fullWidth
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Адрес доставки"
                            variant="outlined"
                            fullWidth
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: 20 }}
                >
                    Подтвердить заказ
                </Button>
            </form>
        </Container>
    );
}
