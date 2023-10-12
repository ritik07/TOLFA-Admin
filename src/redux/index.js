import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { userProfile } from "./reducers/userProfile";

const reducer = combineReducers({
  userProfile,
});

export const store = createStore(reducer, applyMiddleware(thunk));
