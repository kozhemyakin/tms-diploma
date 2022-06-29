import { createContext, useState, useEffect } from "react";
import axios from "axios";
import React from 'react'; 
import SalePage from '../pages/SalePage'

export const Cart = createContext();

export const Context = ({children}) => {
    const [ cart, setCart ] = useState([]);  

    setCart({
        name: 'kek',
        age: '15'
    })

    return (
        <Cart.Provider value={{cart, setCart}}>
            {children}
        </Cart.Provider>
    )
};

export default Context;