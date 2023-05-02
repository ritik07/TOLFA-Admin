import * as actionTypes from "../actions/actionTypes";

const initalState = {
  userProfile: "",
};

export const userProfile = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.setUserProfile:
      return { userProfile: action.payload };

    default:
      return state;
  }
};
