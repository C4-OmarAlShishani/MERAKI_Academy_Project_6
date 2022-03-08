/** @format */

const initialState = {
  itemInfo: {},
};
// =======================  //

const itemInfoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_ITEMINFO":
      return { itemInfo: payload["0"] };
    case "UPDATE_ITEMINFO":
      return { itemInfo: payload };

    default:
      return state;
  }
};

export default itemInfoReducer;

// =======================  //

export const setItemInfo = (ItemInfo) => {
  return { type: "SET_ITEMINFO", payload: ItemInfo };
};
// =======================  //

export const updateItemInfo = (updatedItemInfo) => {
  return { type: "UPDATE_ITEMINFO", payload: updatedItemInfo };
};
// =======================  //

// export const deleteItemInfo = (id) => {
//   return { type: "DELETE_ITEMINFO", payload: id };
// };
