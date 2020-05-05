import { takeEvery, call, put, fork } from "redux-saga/effects";
import {
  fetchAuthLogin,
  fetchAuthSuccess,
  fetchAuthFailure,
  fetchAuthRegister,
  fetchAuthLogout,
} from "./actions";
import { fetchProfileClear } from "../profile";

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
  yield takeEvery(fetchAuthLogin, function* (action) {
    try {
      const result = yield call(request, {
        path: "auth",
        payload: action.payload,
      });
      if (result.success) {
        yield put(fetchAuthSuccess(result.token));
        window.localStorage.setItem("token", result.token);
      } else yield put(fetchAuthFailure(result.error));
    } catch (error) {
      yield put(fetchAuthFailure(error));
    }
  });
}

export function* registerWatch() {
  yield takeEvery(fetchAuthRegister, function* (action) {
    try {
      const result = yield call(request, {
        path: "register",
        payload: action.payload,
      });
      if (result.success) {
        yield put(fetchAuthSuccess(result.token));
        yield window.localStorage.setItem("token", result.token);
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
    } catch (error) {
      yield put(fetchAuthFailure(error));
    }
  });
}

export default function* () {
  yield fork(loginWatch);
  yield fork(registerWatch);
  yield fork(logoutWatch);
}
