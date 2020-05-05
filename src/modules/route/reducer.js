import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import { fetchAddressSuccess, fetchIsFillProfile } from "./actions";

const address = handleActions(
  {
    [fetchAddressSuccess]: (_state, action) => action.payload,
  },
  []
);

const error = handleActions(
  {
    [fetchAddressSuccess]: (_state, action) => action.payload,
  },
  null
);

const isFillProfile = handleActions(
  {
    [fetchIsFillProfile]: () => true,
  },
  false
);

export default combineReducers({
  address,
  error,
  isFillProfile,
});
