import { takeEvery, call, put, fork } from "redux-saga/effects";
import {
  fetchAddressLoad,
  fetchAddressSuccess,
  fetchAddressFailure,
} from "./actions";

const getAddress = () => {
  return fetch(`https://loft-taxi.glitch.me/addressList`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export function* loginWatch() {
  yield takeEvery(fetchAddressLoad, function* () {
    try {
      const result = yield call(getAddress);
      yield put(fetchAddressSuccess(result));
    } catch (error) {
      yield put(fetchAddressFailure(error));
    }
  });
}

export default function* () {
  yield fork(loginWatch);
}
