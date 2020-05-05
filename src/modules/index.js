import { combineReducers } from "redux";
import { fork } from "redux-saga/effects";

import auth, { sagas as authSaga } from "./auth";
import profile, { sagas as profileSaga } from "./profile";
import route, { sagas as routeSaga } from "./route";

export default combineReducers({
  auth,
  profile,
  route,
});

export function* rootSaga() {
  yield fork(profileSaga);
  yield fork(authSaga);
}
