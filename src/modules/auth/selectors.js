// import { createSelector } from 'reselect';

export const getIsLogin = state => state.auth.isLogin;
export const getToken = state => state.auth.token;
export const getError = state => state.auth.error;
// export const getSeriesImages = createSelector(
//   state => state.series.elements,
//   elements =>
//     elements.map(({ id, image: { original }, name }) => ({
//       id,
//       image: original,
//       name,
//     })),
// );