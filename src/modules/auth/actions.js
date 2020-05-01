import { createAction } from 'redux-actions';

export const fetchAuthLogin = createAction('FETCH_AUTH_LOGIN');
export const fetchAuthSuccess = createAction('FETCH_AUTH_SUCCESS');
export const fetchAuthFailure = createAction('FETCH_AUTH_FAILURE');  
export const fetchAuthLogout = createAction('FETCH_AUTH_LOGOUT');  
export const fetchAuthRegister = createAction('FETCH_AUTH_REGISTER');  

