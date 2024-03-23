import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: [] };


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x); // if exists it just replaces with the same item
            } else {
                state.cartItems = [...state.cartItems, item] // Do not use state.cartItems.push(item); which is directly mutating the state variable, its not supportable in REDUX
            }

            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter( (x) => x._id !== action.payload._id);

            return updateCart(state);
        },
        clearCart: (state) => {
            state.cartItems = [];
            return updateCart(state);
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;