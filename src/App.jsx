import React from 'react';
import Homepage from './pages/Homepage'
import Profile from './pages/Profile'
import ProductPage from './pages/ProductPage'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import NotFound from './pages/NotFound'


import {Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/wishlist" element={<Wishlist />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
        </Routes>
    </>
  );
}

export default App;
