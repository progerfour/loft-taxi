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

function* paymentDataLoadFlow() {
  try {
    const token = yield select(getToken);
    const result = yield call(getPaymentData, { token });
    if (result.id) {
      yield put(fetchProfileSet(result));
      yield put(fetchIsFillProfile(true));
    } else yield put(fetchProfileFailure(result.error));
  } catch (error) {
    yield put(fetchProfileFailure(error));
  }
}

export function* paymentDataLoadWatch() {
  yield takeEvery(fetchProfileLoad, paymentDataLoadFlow);
}

function* paymentDataSaveFlow(action) {
  try {
    const token = yield select(getToken);
    const result = yield call(setPaymentData, token, action.payload);
    if (result.success) {
      yield put(fetchProfileSet(action.payload));
      yield put(fetchProfileSubmitSucceded(true));
    } else yield put(fetchProfileFailure(result.error));
  } catch (error) {
    yield put(fetchProfileFailure(error));
  }
}

export function* paymentDataSaveWatch() {
  yield takeEvery(fetchProfileSave, paymentDataSaveFlow);
}

export default function* () {
  yield fork(paymentDataLoadWatch);
  yield fork(paymentDataSaveWatch);
}
