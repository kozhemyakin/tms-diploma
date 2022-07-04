import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    qty: {
    },
    ids: [],
    ws_products: [],
};

export const qtyCounterSlice = createSlice({
    name: 'productQtyBadge',
    initialState,
    reducers: {
        addProductOnBadge: (state, action) => {
            if(state.qty[action.payload]) {
                state.qty[action.payload] += 1;
            } else {
                state.qty[action.payload] = 1;
                state.ids.push(action.payload);
            }
        },
        deleteProduct: (state, action) => {
                let index = state.ids.indexOf(`${action.payload}`);
                state.ids.splice(index, 1);
                delete state.qty[`${action.payload}`];
        },
        increment: (state, action) => {
            state.qty[action.payload] += 1; 
        },
        decrement: (state, action) => {
            if (state.qty[action.payload] === 1) {
                return
              } else {
                state.qty[action.payload] -= 1;
              }
        },
        clearCart: (state, action) => {
            state.qty = {};
        },
        addToWishlist: (state, action) => {
            if(!state.ws_products.includes(action.payload)) {
                state.ws_products.push(action.payload)
            } else {
                alert('Product is already in the wishlist')
            }
        },
        deleteFromWishlist: (state, action) => {
            let ind = state.ws_products.indexOf(`${action.payload}`);
            state.ws_products.splice(ind, 1);
        },
}})

export const { addProductOnBadge, deleteProduct, increment, decrement, clearCart, addToWishlist, deleteFromWishlist } = qtyCounterSlice.actions;
export default qtyCounterSlice.reducer;
