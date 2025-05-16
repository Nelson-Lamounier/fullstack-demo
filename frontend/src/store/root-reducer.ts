import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./user/user.slice";
import { categoryReducer} from "./categories/category.slice"
import { cartReducer } from "./cart/cart.slice";
import { shippingReducer } from "./shipping/shippingSlice";


export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoryReducer,
    cart: cartReducer,
    shipping: shippingReducer,
})
