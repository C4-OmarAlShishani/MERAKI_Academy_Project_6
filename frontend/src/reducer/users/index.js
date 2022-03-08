
/** @format */

const initialState = {
    users: [],
  };
  // =======================  //
  
  const usersReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case "SET_USERS":
        return { ...state, users: payload };
  
      case "DELETE_USERS":
        return {
            ...state,
            users: state.users.filter((element) => {
              return element.id != payload;
            }),
          };
        
      default:
        return state;
    }
  };
  
  export default usersReducer;
  
  // =======================  //
  
  export const setUsers = (users) => {
    return { type: "SET_USERS", payload: users };
  };
  // =======================  //
  
  export const deleteUsers = (deleteUsers) => {
    return { type: "DELETE_USERS", payload: deleteUsers };
  };
  // =======================  //
  