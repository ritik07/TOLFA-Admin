import * as actionTypes from "../actions/actionTypes";

const initalState = {
  productDetail: null,
};

export const productDetail = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.setProductDetail:
      return { productDetail: action.payload };

    default:
      return state;
  }
};
