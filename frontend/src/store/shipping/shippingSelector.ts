import { RootState } from "../store";

export const selectShippingInfo = (state: RootState) => state.shipping.shippingInfo;