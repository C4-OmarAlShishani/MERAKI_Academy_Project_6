/** @format */

const initialState = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
  isLoggedIn: !localStorage.getItem("token") ? false : true,
  isAdmin: !localStorage.getItem("isAdmin") ? false : true,
};
// =======================  //

const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOG_IN":
      return { ...state, token: payload, isLoggedIn: true };
    case "LOG_OUT":
      return { ...state, token: null, isLoggedIn: false, isAdmin: false };
    case "IS_ADMIN":
      return { ...state, isAdmin: true };
    default:
      return state;
  }
};
export default loginReducer;

// =======================  //
export const logIn = (token) => {
  return { type: "LOG_IN", payload: token };
};
// =======================  //

export const logOut = () => {
  return { type: "LOG_OUT" };
};
// =======================  //

export const isAdmin = () => {
  return { type: "IS_ADMIN" };
};
