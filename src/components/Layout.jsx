import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import cl from '../App.module.css'

const setActive = ({ isActive }) => (isActive ? 'active-link' : '');

export default function Layout() {
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
                        <IconButton sx={{ color: '#333' }}>
                            <AccountCircleIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar /> {/* Служебный Toolbar для компенсации фиксированного AppBar */}
            <Outlet />
        </>
    );
}
