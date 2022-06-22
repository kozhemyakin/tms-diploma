import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    qty: {
    },
    ids: []
};

export const qtyCounterSlice = createSlice({
    name: 'productQtybadge',
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
            if(state.qty[action.payload] !== 1) {
                state.qty[action.payload] -= 1;
            } else {
                console.log('kekek')
                let index = state.ids.indexOf(`${action.payload}`);
                state.ids.splice(index, 1);
                delete state.qty[`${action.payload}`];
            }
        }
    }
})

export const { addProductOnBadge, deleteProduct } = qtyCounterSlice.actions;
export default qtyCounterSlice.reducer;