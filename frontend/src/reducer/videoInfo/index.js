/** @format */

const initialState = {
  videoInfo: {},
  Comments: {},
};
// =======================  //

const videoInfoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_VIDEO_INFO":
      return { ...state, videoInfo: payload["0"] };
    case "UPDATE_VIDEO_INFO":
      return { ...state, videoInfo: payload };

      /**************Comment******************/
    case "SET_COMMENT":
      return { ...state, Comments: payload };

    case "ADD_COMMENT":
      return { ...state, Comments: [...state.Comments, payload] };

    case "DELETE_COMMENT":
      return {
        ...state,
        Comments: state.Comments.filter((video) => {
          return video.id !== payload;
        }),
      };
    case "UPDATE_COMMENT":
      return {
        ...state,
        Comments: state.Comments.map((comment) => {
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

export default videoInfoReducer;

// =======================  //

export const setVideoInfo = (videoInfo) => {
  return { type: "SET_VIDEO_INFO", payload: videoInfo };
};
// =======================  //

export const updateVideoInfo = (updatedVideoInfo) => {
  return { type: "UPDATE_VIDEO_INFO", payload: updatedVideoInfo };
};


// ==========Comments=============  //

export const setComments = (comments) => {
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
