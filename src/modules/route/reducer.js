import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  fetchAddressLoad,
  fetchAddressSuccess,
  fetchAddressFailure,
  fetchIsFillProfile,
  fetchIsOrder,
} from "./actions";

const address = handleActions(
  {
    [fetchAddressLoad]: () => [],
    [fetchAddressSuccess]: (_state, action) => action.payload,
  },
  []
);

const error = handleActions(
  {
    [fetchAddressLoad]: () => null,
    [fetchAddressFailure]: (_state, action) => action.payload,
  },
  null
);

const isFillProfile = handleActions(
  {
    [fetchIsFillProfile]: (_state, action) => action.payload,
  },
  false
);

const isOrder = handleActions(
  {
    [fetchIsOrder]: (_state, action) => action.payload,
  },
  false
);

export default combineReducers({
  address,
  error,
  isFillProfile,
  isOrder,
});
