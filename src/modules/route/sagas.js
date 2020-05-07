import { takeEvery, call, put, fork } from "redux-saga/effects";
import {
  fetchAddressLoad,
  fetchAddressSuccess,
  fetchAddressFailure,
  fetchOrderLoad,
  fetchOrderSuccess,
  fetchOrderFailure,
  fetchIsOrder,
} from "./actions";

const getAddress = () => {
  return fetch(`https://loft-taxi.glitch.me/addressList`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

function* addressLoadFlow() {
  try {
    const result = yield call(getAddress);
    yield put(fetchAddressSuccess(result.addresses));
  } catch (error) {
    yield put(fetchAddressFailure(error));
  }
}

export function* addressLoadWatch() {
  yield takeEvery(fetchAddressLoad, addressLoadFlow);
}

const getRoute = ({ address1, address2 }) => {
  return fetch(
    `https://loft-taxi.glitch.me/route?address1=${address1}&address2=${address2}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());
};

function* routeLoadFlow(action) {
  try {
    const result = yield call(getRoute, action.payload);
    yield put(fetchOrderSuccess(result));
    yield put(fetchIsOrder(true));
  } catch (error) {
    yield put(fetchOrderFailure(error));
  }
}

export function* routeLoadWatch() {
  yield takeEvery(fetchOrderLoad, routeLoadFlow);
}

export default function* () {
  yield fork(addressLoadWatch);
  yield fork(routeLoadWatch);
}
