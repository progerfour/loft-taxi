import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  fetchProfileLoad,
  fetchProfileClear,
  fetchProfileSet,
  fetchProfileFailure,
} from "./actions";

const profile = handleActions(
  {
    [fetchProfileClear]: () => null,
    [fetchProfileSet]: (_state, action) => action.payload,
  },
  null
);

const error = handleActions(
  {
    [fetchProfileClear]: () => null,
    [fetchProfileFailure]: (_state, action) => action.payload,
  },
  null
);

export default combineReducers({
  profile,
  error,
});
