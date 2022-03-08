/** @format */

const initialState = {
  items: [],
  categories: [],
};
// =======================  //

const itemsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_ITEMS":
      return { ...state, items: payload };

    case "ADD_ITEM":
      return { ...state, items: [...state.items, payload] };

    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => {
          return item.id !== payload;
        }),
      };
    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === payload.id) {
            return payload;
          }
          return item;
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

export default itemsReducer;

// =======================  //

export const setItems = (items) => {
  return { type: "SET_ITEMS", payload: items };
};
// =======================  //

export const addItem = (newItem) => {
  return { type: "ADD_ITEM", payload: newItem };
};
// =======================  //

export const updateItem = (newItem) => {
  return { type: "UPDATE_ITEM", payload: newItem };
};
// =======================  //

export const deleteItem = (id) => {
  return { type: "DELETE_ITEM", payload: id };
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
