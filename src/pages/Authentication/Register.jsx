// Register.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid } from '@mui/material';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Логика регистрации
        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Регистрация успешна:', data);
                // Перенаправление на страницу входа
                window.location.href = '/login';
            })
            .catch(error => {
                console.error('Ошибка при регистрации:', error);
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
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="given-name"
                            autoFocus
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
                            autoComplete="new-password"
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
