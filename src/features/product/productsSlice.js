import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
}

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (_, {rejectWithValue, dispatch}, ) => {
        const res = await axios.get('http://localhost:3001/products')

        dispatch(setProducts(res.data));
    }
)

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        }
    },
    extraReducers: {
        [getProducts.fulfilled]: (state, action) => {
            
        },
        [getProducts.pending]: (state, action) => {

        },
        [getProducts.rejected]: (state, action) => {

        },
    }
})

export const {setProducts} = productSlice.actions;

export default productSlice.reducer;