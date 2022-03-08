/** @format */

const initialState = {
  videos: [],
  categories: [],
};
// =======================  //

const videosReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_VIDEO":
      return { ...state, videos: payload };

    case "ADD_VIDEO":
      return { ...state, videos: [...state.videos, payload] };

    case "DELETE_VIDEO":
      return {
        ...state,
        videos: state.videos.filter((video) => {
          return video.id !== payload;
        }),
      };
    case "UPDATE_VIDEO":
      return {
        ...state,
        videos: state.videos.map((video) => {
          if (video.id === payload.id) {
            return payload;
          }
          return video;
        }),
      };

    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((category) => {
          return category.id !== payload;
        }),
      };

    case "SET_CATEGORIES":
      return { ...state, categories: payload };

    case "ADD_CATEGORY":
      return { ...state, categories: [...state.categories, payload] };

    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (category.id === payload.id) {
            return payload;
          }
          return category;
        }),
      };

    default:
      return state;
  }
};

export default videosReducer;

// =======================  //

export const setVideos = (videos) => {
  return { type: "SET_VIDEO", payload: videos };
};
// =======================  //

export const addVideo = (newVideo) => {
  return { type: "ADD_VIDEO", payload: newVideo };
};
// =======================  //

export const updateVideo = (newVideo) => {
  return { type: "UPDATE_VIDEO", payload: newVideo };
};
// =======================  //

export const deleteVideo = (id) => {
  return { type: "DELETE_VIDEO", payload: id };
};
// =======================  //
export const addCategory = (newCategory) => {
  return { type: "ADD_CATEGORY", payload: newCategory };
};
// =======================  //

export const setCategories = (categories) => {
  return { type: "SET_CATEGORIES", payload: categories };
};
// =======================  //
export const deleteCategory = (id) => {
  return { type: "DELETE_CATEGORY", payload: id };
};
// =======================  //
export const updateCategory = (newCategory) => {
  return { type: "UPDATE_CATEGORY", payload: newCategory };
};
// =======================  //
