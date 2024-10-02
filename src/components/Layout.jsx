import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Menu,
    MenuItem
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import cl from '../App.module.css';
import { useAuth } from '../AuthContext'; // Импортируйте useAuth

const setActive = ({ isActive }) => (isActive ? 'active-link' : '');

export default function Layout() {
    const [anchorEl, setAnchorEl] = useState(null); // Состояние для управления меню

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget); // Устанавливаем элемент для меню
    };

    const handleClose = () => {
        setAnchorEl(null); // Закрываем меню
    };
    const { user, logout } = useAuth();
    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: 'rgba(245, 245, 245, 0.6)', // Прозрачный фон
                    boxShadow: 'none',
                    borderBottom: '1px solid #ddd',
                    borderRadius: '0 0 16px 16px',
                    padding: '8px 16px',
                }}
            >
                <Toolbar sx={{ display: 'flex', gap: "2vw", justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }}>
                        PC Store
                    </Typography>
                    <div style={{ flexGrow: 1 }}>
                        <Button
                            component={NavLink}
                            to="/"
                            sx={{ color: '#333', marginRight: 2, textTransform: 'none' }}
                            className={setActive}
                        >
                            Главная
                        </Button>
                        <Button
                            component={NavLink}
                            to="/products"
                            sx={{ color: '#333', marginRight: 2, textTransform: 'none' }}
                            className={setActive}
                        >
                            Продукты
                        </Button>
                    </div>
                    <div className={cl.rightMenu}>
                        <IconButton component={NavLink} to="/cart" sx={{ color: '#333', marginRight: 2 }}>
                            <ShoppingCartIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle sx={{ color: '#333', marginRight: 2 }} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {user ? (
                                <>
                                    <Button onClick={logout} color="inherit">Выйти</Button>
                                    <Typography variant="body1" color="inherit">{user.name}</Typography>
                                </>
                            ) : (
                                <>
                                    <Button component={NavLink} to="/login" color="inherit">Войти</Button>
                                    <Button component={NavLink} to="/register" color="inherit">Регистрация</Button>
                                </>
                            )}
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar /> {/* Служебный Toolbar для компенсации фиксированного AppBar */}
            <Outlet />
        </>
    );
}
