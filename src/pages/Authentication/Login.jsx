// Login.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid } from '@mui/material';
import { useAuth } from '../../AuthContext'; // Импортируйте useAuth
import cl from './Auth.module.css';

export default function Login() {
    const { login } = useAuth(); // Получите функцию login из контекста
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Исправлено: удалено лишнее дублирование setFormData
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Логика авторизации
        fetch(`http://localhost:3001/users?email=${formData.email}&password=${formData.password}`)
            .then(response => response.json())  // Исправлено: завершен вызов fetch
            .then(data => {
                if (data.length > 0) {
                    console.log('Авторизация успешна:', data[0]);
                    login(data[0]); // Вызовите login для сохранения пользователя в контексте
                    window.location.href = '/'; // Перенаправление на главную страницу
                } else {
                    console.error('Неверный email или пароль');
                    alert('Неверный email или пароль');
                }
            })
            .catch(error => {
                console.error('Ошибка при авторизации:', error);
            });
    };

    return (
        <Container className={cl.container} component="main" maxWidth="xs">
            <Typography variant="h5" align="center">Авторизация</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Пароль"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Войти
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Button href="/register">Нет аккаунта</Button>
                </Grid>
            </Grid>
        </Container>
    );
}
