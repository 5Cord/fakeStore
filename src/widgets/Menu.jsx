import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import NotFound from '../pages/NotFound';
import ProductPage from '../pages/Product/ProductPage';
import Layout from '../components/Layout';
import Cart from '../pages/Cart/Cart';

function Menu() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path='products' element={<ProductPage />} />
                    <Route path='cart' element={<Cart />} />
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </>
    )
}

export default Menu
