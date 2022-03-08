/** @format */

const initialState = {
  workers: [],
  worker_id: 0,
};
// =======================  //
const workerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_WORKER":
      return { ...state, workers: payload };

    case "SET_WORKER_ID":
      return { ...state, worker_id: payload };

    case "DELETE_WORKER":
      return {
        ...state,
        workers: state.workers.filter((worker) => {
          return worker.w_id !== payload;
        }),
      };

    default:
      return state;
  }
};

export default workerReducer;

// =======================  //

export const setWorkers = (workers) => {
  return { type: "SET_WORKER", payload: workers };
};
// =======================  //
export const deleteWorkers = (id) => {
  return { type: "DELETE_WORKER", payload: id };
};
// =======================  //
export const setWorkerId = (id) => {
  return { type: "SET_WORKER_ID", payload: id };
};
// =======================  //
