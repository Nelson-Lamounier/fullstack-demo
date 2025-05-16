import { createSelector } from "reselect";

import { RootState } from "../store";

import { CartState } from "./cart.slice";


// Retrieves the cart slice (CartState) from the root Redux state.
export const selectCardReducer = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector(
  [selectCardReducer],
  (cart) => cart.cartItems || []
);

export const selectIsCartOpen = createSelector(
  [selectCardReducer],
  (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems): number =>
    cartItems.reduceRight((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems): number =>
    cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    )
);
