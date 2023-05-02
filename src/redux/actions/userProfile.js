import * as actionTypes from "./actionTypes";
export const setUserProfile = (data) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.setUserProfile,
      payload: data,
    });
  };
};
