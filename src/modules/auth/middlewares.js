import {
  fetchAuthLogin,
  fetchAuthSuccess,
  fetchAuthFailure,
  fetchAuthRegister,
} from "./actions";

export const authFetchMiddleware = (store) => (next) => (action) => {
  if (action.type === fetchAuthLogin.toString()) {
    fetch(`https://loft-taxi.glitch.me/auth`, {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((answer) => {
        answer.success
          ? store.dispatch(fetchAuthSuccess(answer.token))
          : store.dispatch(fetchAuthFailure(answer.error));
      })
      .catch((error) => {
        store.dispatch(fetchAuthFailure(error));
      });
  } else if (action.type === fetchAuthRegister.toString()) {
    fetch(`https://loft-taxi.glitch.me/register`, {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((answer) => {
        answer.success
          ? store.dispatch(fetchAuthSuccess(answer.token))
          : store.dispatch(fetchAuthFailure(answer.error));
      })
      .catch((error) => {
        store.dispatch(fetchAuthFailure(error));
      });
  }
  return next(action);
};
