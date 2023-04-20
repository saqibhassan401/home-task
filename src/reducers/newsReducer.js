import { FETCH_NEWS } from "../actionTypes/actionTypes";

const initialState = {
  news: null,
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS:
      return {
        ...state,
        news: action.data,
      };
    default:
      return state;
  }
};

export default newsReducer