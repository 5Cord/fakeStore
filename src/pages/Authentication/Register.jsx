// Register.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid } from '@mui/material';
import { useAuth } from '../../AuthContext'; // Импортируйте useAuth

export default function Register() {
    const { login } = useAuth(); // Получите функцию login из контекста
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Проверка существующего email
        fetch(`http://localhost:3001/users?email=${formData.email}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    console.error('Пользователь с таким email уже зарегистрирован');
                    alert('Пользователь с таким email уже зарегистрирован');
                } else {
                    // Регистрация нового пользователя
                    fetch('http://localhost:3001/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Регистрация успешна:', data);
                            login(data); // Вызовите login для сохранения пользователя в контексте
                            window.location.href = '/'; // Перенаправление на главную страницу
                        })
                        .catch(error => {
                            console.error('Ошибка при регистрации:', error);
                        });
                }
            })
            .catch(error => {
                console.error('Ошибка при проверке email:', error);
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography variant="h5" align="center">Регистрация</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Имя"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Фамилия"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </Grid>
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
                            Зарегистрироваться
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Button href="/login">Уже есть аккаунт? Войти</Button>
                </Grid>
            </Grid>
        </Container>
    );
}
