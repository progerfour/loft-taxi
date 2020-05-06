import { takeEvery, call, put, fork } from "redux-saga/effects";
import {
  fetchAuthLogin,
  fetchAuthSuccess,
  fetchAuthFailure,
  fetchAuthRegister,
  fetchAuthLogout,
} from "./actions";
import { fetchProfileClear } from "../profile";
import { fetchIsFillProfile, fetchIsOrder, fetchOrderClear } from "../route";

const request = ({ path, payload }) => {
  return fetch(`https://loft-taxi.glitch.me/${path}`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export function* loginWatch() {
  yield takeEvery([fetchAuthLogin, fetchAuthRegister], function* (action) {
    try {
      let params = {
        path: "register",
        payload: action.payload,
      };
      if (action.type === fetchAuthLogin.toString()) {
        params = {
          path: "auth",
          payload: action.payload,
        };
      }
      const result = yield call(request, params);
      if (result.success) {
        yield put(fetchAuthSuccess(result.token));
        window.localStorage.setItem("token", result.token);
      } else yield put(fetchAuthFailure(result.error));
    } catch (error) {
      yield put(fetchAuthFailure(error));
    }
  });
}

export function* logoutWatch() {
  yield takeEvery(fetchAuthLogout, function* () {
    try {
      yield window.localStorage.removeItem("token");
      yield put(fetchProfileClear());
      yield put(fetchIsFillProfile(false));
      yield put(fetchOrderClear());
      yield put(fetchIsOrder(false));
    } catch (error) {
      yield put(fetchAuthFailure(error));
    }
  });
}

export default function* () {
  yield fork(loginWatch);
  yield fork(logoutWatch);
}
