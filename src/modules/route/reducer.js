import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  fetchAddressLoad,
  fetchAddressSuccess,
  fetchAddressFailure,
  fetchIsFillProfile,
  fetchIsOrder,
  fetchOrderLoad,
  fetchOrderSuccess,
  fetchOrderFailure,
  fetchOrderClear,
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
    [fetchAddressFailure]: (_state, action) => action.payload,
    [fetchOrderFailure]: (_state, action) => action.payload,
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
    [fetchOrderLoad]: () => false,
    [fetchIsOrder]: (_state, action) => action.payload,
  },
  false
);

const route = handleActions(
  {
    [fetchOrderLoad]: () => [],
    [fetchOrderSuccess]: (_state, action) => action.payload,
    [fetchOrderClear]: () => [],
  },
  []
);

export default combineReducers({
  address,
  error,
  isFillProfile,
  isOrder,
  route,
});
