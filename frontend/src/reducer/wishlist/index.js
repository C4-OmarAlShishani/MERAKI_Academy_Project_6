const initialState = {
  wishlists: [],

};

const wishlistReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    
    case "SET_WISHLIST":
      return { wishlists: [...payload] };


    case "DELETE_WISHLIST":
      return {
        wishlists: state.wishlists.filter((wishlist) => {
          return wishlist.wishlist_id !== payload;
        }),
      };
    default:
      return state;
  }
};
export default wishlistReducer;



export const setWishlist = (wishlists) => {
  return { type: "SET_WISHLIST", payload: wishlists };
};

export const deleteWishlist = (id) => {
  return { type: "DELETE_WISHLIST", payload: id };
};

