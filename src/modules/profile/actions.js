import { createAction } from "redux-actions";

export const fetchProfileSave = createAction("FETCH_PROFILE_SAVE");
export const fetchProfileClear = createAction("FETCH_PROFILE_CLEAR");
export const fetchProfileLoad = createAction("FETCH_PROFILE_LOAD");
export const fetchProfileSet = createAction("FETCH_PROFILE_SET");
export const fetchProfileFailure = createAction("FETCH_PROFILE_FAILURE");
