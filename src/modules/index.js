import { combineReducers } from "redux";
import { fork } from "redux-saga/effects";

import auth from "./auth";
import profile, { sagas as profileSaga } from "./profile";

export default combineReducers({
  auth,
  profile,
});

export function* rootSaga() {
  yield fork(profileSaga);
}
