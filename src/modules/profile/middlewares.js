import {
  fetchProfileSave,
  fetchProfileSet,
  fetchProfileFailure,
  fetchProfileLoad,
} from "./actions";

import { getToken } from "../auth";

export const profileFetchMiddleware = (store) => (next) => (action) => {
  const token = getToken(store.getState());
  if (action.type === fetchProfileSave.toString()) {
    fetch(`https://loft-taxi.glitch.me/card?token=${token}`, {
      method: "POST",
      body: JSON.stringify({
        ...action.payload,
        token: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((answer) => {
        if (answer.success) {
          store.dispatch(fetchProfileSet(action.payload));
          window.localStorage.setItem("profile", action.payload);
        } else store.dispatch(fetchProfileFailure(answer.error));
      })
      .catch((error) => {
        store.dispatch(fetchProfileFailure(error));
      });
  } else if (action.type === fetchProfileLoad.toString()) {
    fetch(`https://loft-taxi.glitch.me/card?token=${token}`, {
      method: "GET",
      body: JSON.stringify(action.payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((answer) => {
        if (answer.id) {
          console.log(answer);
          store.dispatch(fetchProfileSet(answer));
        } else store.dispatch(fetchProfileFailure(answer.error));
      })
      .catch((error) => {
        store.dispatch(fetchProfileFailure(error));
      });
  }
  return next(action);
};
