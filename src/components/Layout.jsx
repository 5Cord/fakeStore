import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <>
            <nav>
                <NavLink to="/">Главная</NavLink>
                <NavLink to="/products">Продукты</NavLink>
            </nav>
            <Outlet />
            <footer>2024</footer>
        </>
    )
}
