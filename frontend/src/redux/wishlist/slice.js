import { createSlice } from "@reduxjs/toolkit";
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      console.log("add to wishlist ", action.payload);
      const pId = action.payload;
      state.wishlist = [...state.wishlist, pId];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
