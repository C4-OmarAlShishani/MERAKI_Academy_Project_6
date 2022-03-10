/** @format */

const initialState = {
  videoInfo: {},
};
// =======================  //

const videoInfoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_VIDEO_INFO":
      return { videoInfo: payload["0"] };
    case "UPDATE_VIDEO_INFO":
      return { videoInfo: payload };

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
