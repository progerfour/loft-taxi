import { createAction } from "redux-actions";

export const fetchAddressLoad = createAction("FETCH_ADDRESS");
export const fetchAddressSuccess = createAction("FETCH_ADDRESS_SUCCESS");
export const fetchAddressFailure = createAction("FETCH_ADDRESS_FAILURE");
export const fetchIsFillProfile = createAction("FETCH_IS_FILL_PROFILE");
