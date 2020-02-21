import {
  CHANGE_JSON,
  FETCH_JSON,
} from "../actions/actionType";

const initialState = {
  json: [],
  text: ''
};

const postReducer = (state = initialState, action) => {
  switch (action.type){
    case FETCH_JSON:
      return {
        ...state,
        json: action.payload,
        text: action.text
      };
    case CHANGE_JSON:
      return {
        ...state,
        // json: action.payload
      };

    default:
      return state
  }
};

export default postReducer