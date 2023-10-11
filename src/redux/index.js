import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { userProfile } from "./reducers/userProfile";
import { productDetail } from "./reducers/productReducer";

const reducer = combineReducers({
  userProfile,
  productDetail,
});

export const store = createStore(reducer, applyMiddleware(thunk));
