/** @format */

const initialState = {
    comments: [],
  };
  // =======================  //
  
  const commentReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case "SET_COMMENT":
          console.log(payload);
        return { ...state, comments: payload };
  
      case "ADD_COMMENT":
        return { ...state, comments: [...state.comments, payload] };
  
      case "DELETE_COMMENT":
        return {
          ...state,
          comments: state.comments.filter((video) => {
            return video.id !== payload;
          }),
        };
      case "UPDATE_COMMENT":
        return {
          ...state,
          comments: state.comments.map((comment) => {
            if (comment.id === payload.id) {
              return payload;
            }
            return comment;
          }),
        };
      default:
        return state;
    }
  };
  
  export default commentReducer;
  
  // ==========Comments=============  //
  
  export const setComments = (comments) => {
      console.log(comments);
    return { type: "SET_COMMENT", payload: comments };
  };
  // =======================  //
  
  export const addComment = (newComment) => {
    return { type: "ADD_COMMENT", payload: newComment };
  };
  // =======================  //
  
  export const updateComment = (newComment) => {
    return { type: "UPDATE_COMMENT", payload: newComment };
  };
  // =======================  //
  
  export const deleteComment = (id) => {
    return { type: "DELETE_COMMENT", payload: id };
  };
  // =======================  //
  