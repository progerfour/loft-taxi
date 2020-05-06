import { createAction } from "redux-actions";

export const fetchAddressLoad = createAction("FETCH_ADDRESS");
export const fetchAddressSuccess = createAction("FETCH_ADDRESS_SUCCESS");
export const fetchAddressFailure = createAction("FETCH_ADDRESS_FAILURE");
export const fetchIsFillProfile = createAction("FETCH_IS_FILL_PROFILE");
export const fetchOrderLoad = createAction("FETCH_ORDER_LOAD");
export const fetchOrderSuccess = createAction("FETCH_ORDER_SUCCESS");
export const fetchOrderFailure = createAction("FETCH_ORDER_FAILURE");
export const fetchIsOrder = createAction("FETCH_IS_ORDER");
