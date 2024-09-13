import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
const setActive = ({ isActive }) => isActive ? 'active-link' : '';

export default function Layout() {
    return (
        <>
            <nav>
                <NavLink to="/" className={setActive}>Главная</NavLink>
                <NavLink to="/products" className={setActive}>Продукты</NavLink>
            </nav>
            <Outlet />
            <footer>2024</footer>
        </>
    )
}
