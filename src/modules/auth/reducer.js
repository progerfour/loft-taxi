import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  fetchAuthLogin,
  fetchAuthSuccess,
  fetchAuthFailure,
  fetchAuthLogout,
  fetchAuthRegister
} from "./actions";

const isLogin = handleActions(
  {
    [fetchAuthSuccess]: () => true,
    [fetchAuthFailure]: () => false,
    [fetchAuthLogout]: () => false,
  },
  false
);

const token = handleActions(
  {
    [fetchAuthSuccess]: (_state, action) => action.payload,
    [fetchAuthLogout]: () => null,
  },
  null
);

const error = handleActions(
  {
    [fetchAuthLogin]: () => null,
    [fetchAuthFailure]: (_state, action) => action.payload,
  },
  null
);

export default combineReducers({
  token,
  isLogin,
  error,
});
