import * as actionTypes from "./actionTypes";

export const setProductDetail = (data) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.setProductDetail,
      payload: data,
    });
  };
};
