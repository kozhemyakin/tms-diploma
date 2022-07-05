import React from 'react';
import Homepage from './pages/Homepage'
import Profile from './pages/Profile'
import ProductPage from './pages/ProductPage'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import CheckoutPage from './pages/CheckoutPage'
import SalePage from './pages/SalePage'
import ContactsPage from './pages/Contacts';
import {Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/wishlist" element={<Wishlist />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/checkout" element={<CheckoutPage />}></Route>
          <Route path="/sale" element={<SalePage />}></Route>
          <Route path="/contacts" element={<ContactsPage />}></Route>
        </Routes>
    </div>
  );
}

export default App;
