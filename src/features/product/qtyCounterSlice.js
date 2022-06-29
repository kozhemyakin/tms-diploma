import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    qty: {
    },
    ids: []
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
    }
})

export const { addProductOnBadge, deleteProduct, increment, decrement } = qtyCounterSlice.actions;
export default qtyCounterSlice.reducer;