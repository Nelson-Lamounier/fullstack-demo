import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ShippingInfo {
  name: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  notes?: string;
}

export interface ShippingState {
  shippingInfo: ShippingInfo | null;
}

const initialState: ShippingState = {
  shippingInfo: null,
};

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    setShippingInfo(state, action: PayloadAction<ShippingInfo>) {
      state.shippingInfo = action.payload;
    },
    clearShippingInfo(state) {
      state.shippingInfo = null;
    },
  },
});

export const { setShippingInfo, clearShippingInfo } = shippingSlice.actions;

export const shippingReducer = shippingSlice.reducer;
