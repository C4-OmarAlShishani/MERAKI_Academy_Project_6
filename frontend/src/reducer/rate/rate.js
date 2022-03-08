// /** @format */

const initialState = {
  rates: [],
};

const rateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_RATES":
      return { ...state, rates: payload };

    case "ADD_RATE":
      return { ...state, rates: [...state.rates, payload] };
    default:
      return state;
  }
};

export default rateReducer;

export const setRates = (rates) => {
  return { type: "SET_RATES", payload: rates };
};

// =======================  //

export const addRate = (newRate) => {
  return { type: "ADD_RATE", payload: newRate };
};
