/** @format */

import { combineReducers, createStore } from "redux";
import videosReducer from "./video/index";
import loginReducer from "./login/index";
import videoInfoReducer from "./videoInfo/index";
import usersReducer from "./users/index";
import commentReducer from "./comments/index";

const reducers = combineReducers({
  videosReducer,
  loginReducer,
  videoInfoReducer,
  usersReducer,
  commentReducer
});

const store = createStore(reducers);

export default store;
