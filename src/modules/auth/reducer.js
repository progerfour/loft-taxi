import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  fetchAuthLogin,
  fetchAuthSuccess,
  fetchAuthFailure,
  fetchAuthLogout,
  fetchAuthRegister,
} from "./actions";

const storageToken = window.localStorage.getItem("token");

const isLogin = handleActions(
  {
    [fetchAuthSuccess]: () => true,
    [fetchAuthFailure]: () => false,
    [fetchAuthLogout]: () => false,
  },
  !!storageToken
);

const token = handleActions(
  {
    [fetchAuthSuccess]: (_state, action) => action.payload,
    [fetchAuthLogout]: () => null,
  },
  storageToken
);

const error = handleActions(
  {
    [fetchAuthLogin]: () => null,
    [fetchAuthRegister]: () => null,
    [fetchAuthFailure]: (_state, action) => action.payload,
  },
  null
);

export default combineReducers({
  token,
  isLogin,
  error,
});
