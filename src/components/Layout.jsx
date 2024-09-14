import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
const setActive = ({ isActive }) => isActive ? 'active-link' : '';
import { FaShoppingCart } from 'react-icons/fa';

export default function Layout() {
    return (
        <>
            <nav>
                <NavLink to="/" className={setActive}>Главная</NavLink>
                <NavLink to="/products" className={setActive}>Продукты</NavLink>
                <NavLink to="/cart" className={setActive}><FaShoppingCart /></NavLink>
            </nav>
            <Outlet />
        </>
    )
}
