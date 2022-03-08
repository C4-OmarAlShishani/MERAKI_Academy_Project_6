/** @format */

import { combineReducers, createStore } from "redux";
import cartReducer from "./cart/index";
import videosReducer from "./video/index";
import loginReducer from "./login/index";
import videoInfoReducer from "./videoInfo/index";
import wishlistReducer from "./wishlist/index";
import usersReducer from "./users/index";
import serviceReducer from "./service/index";
import workerReducer from "./worker/index";
import rateReducer from "./rate/rate";
const reducers = combineReducers({
  videosReducer,
  loginReducer,
  cartReducer,
  videoInfoReducer,
  wishlistReducer,
  usersReducer,
  serviceReducer,
  workerReducer,
  rateReducer,
});

const store = createStore(reducers);

export default store;
