import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useState } from "react";

const initialState = {
    product: []
};



export const getProductSlice = createSlice({
    name: 'getProducts',
    initialState,
    reducers: {
        getProducts: (state, action) => {
            console.log('asd')
              
        }
    }
})

export const { getProducts } = getProductSlice.actions;
export default getProductSlice.reducer;