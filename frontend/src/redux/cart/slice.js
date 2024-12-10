import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [], // Stores product IDs or objects depending on your use case
  },
  reducers: {
    addToCart: (state, action) => {
      const pId = action.payload;

      // Ensure the payload is valid
      if (!pId) {
        console.error("Invalid product ID:", pId);
        return;
      }

      // Check if the product already exists in the cart
      if (state.cart.includes(pId)) {
        console.log("Product is already in the cart:", pId);
        return;
      }

      // Add the product to the cart
      state.cart.push(pId);
    },

    removeFromCart: (state, action) => {
      const pId = action.payload;
      console.log("removeFromCart", pId);
      console.log(
        "removeFromCart",
        state.cart.filter((x) => x !== pId),
      );
      // Ensure the payload is valid
      if (!pId) {
        console.error("Invalid product ID:", pId);
        return;
      }

      // Filter out the product from the cart
      state.cart = state.cart.filter((item) => item !== pId);
    },
  },
});

// Export action creators
export const { addToCart, removeFromCart } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
