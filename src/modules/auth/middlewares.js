import {
  fetchAuthLogin,
  fetchAuthSuccess,
  fetchAuthFailure,
  fetchAuthRegister,
  fetchAuthLogout,
} from "./actions";

const request = (path, payload, dispatch) => {
  fetch(`https://loft-taxi.glitch.me/${path}`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((answer) => {
      if (answer.success) {
        dispatch(fetchAuthSuccess(answer.token));
        window.localStorage.setItem("token", answer.token);
      } else dispatch(fetchAuthFailure(answer.error));
    })
    .catch((error) => {
      dispatch(fetchAuthFailure(error));
    });
};

export const authFetchMiddleware = (store) => (next) => (action) => {
  if (action.type === fetchAuthLogin.toString()) {
    request("auth", action.payload, store.dispatch);
  } else if (action.type === fetchAuthRegister.toString()) {
    request("register", action.payload, store.dispatch);
  } else if (action.type === fetchAuthLogout.toString()) {
    window.localStorage.removeItem("token");
  }
  return next(action);
};
