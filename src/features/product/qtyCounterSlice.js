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
        }
    }
})

export const { addProductOnBadge } = qtyCounterSlice.actions;
export default qtyCounterSlice.reducer;