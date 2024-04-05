
export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
} // always returns a string because of toFixed()

export const updateCart = (state) => {

    // Calculate the items price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

    // Calculate the shipping price (If order is over $100 then free, else ₹10 shipping)
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

    // Calculate the tax price (15% tax)
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

    // Calculate the total price
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    // Saves to localstorage
    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}
