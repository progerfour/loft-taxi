import { takeEvery, call, put, select, fork } from "redux-saga/effects";
import {
  fetchProfileSave,
  fetchProfileSet,
  fetchProfileFailure,
  fetchProfileLoad,
  fetchProfileSubmitSucceded,
} from "./actions";

import { fetchIsFillProfile } from "../route";
import { getToken } from "../auth";

const getPaymentData = ({ token }) => {
  return fetch(`https://loft-taxi.glitch.me/card?token=${token}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

const setPaymentData = (token, payload) => {
  return fetch(`https://loft-taxi.glitch.me/card?token=${token}`, {
    method: "POST",
    body: JSON.stringify({
      ...payload,
      token: token,
    }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://loft-taxi.glitch.me/",
    },
  }).then((response) => response.json());
};

export function* handlePaymentDataLoad() {
  yield takeEvery(fetchProfileLoad, function* () {
    try {
      const token = yield select(getToken);
      const result = yield call(getPaymentData, { token });
      if (result.id) {
        yield put(fetchProfileSet(result));
        yield put(fetchIsFillProfile());
      } else yield put(fetchProfileFailure(result.error));
    } catch (error) {
      yield put(fetchProfileFailure(error));
    }
  });
}

export function* handlePaymentDataSave() {
  yield takeEvery(fetchProfileSave, function* (action) {
    try {
      const token = yield select(getToken);
      const result = yield call(setPaymentData, token, action.payload);
      if (result.success) {
        yield put(fetchProfileSet(result));
        yield put(fetchProfileSubmitSucceded(true));
      } else yield put(fetchProfileFailure(result.error));
    } catch (error) {
      yield put(fetchProfileFailure(error));
    }
  });
}

export default function* () {
  yield fork(handlePaymentDataLoad);
  yield fork(handlePaymentDataSave);
}
