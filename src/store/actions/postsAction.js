import {
  FETCH_JSON,
  CHANGE_JSON,

} from "./actionType";
import json from '../../state'

export const fetchJson = () => async dispatch => {
  let newJson = [];
  json.map(item => {
   item.name.split('').map(el => {
    newJson.push({
      name: el,
      styles: item.styles
      })
    })
  });
  console.log(newJson, 444)
  try{
    dispatch({
      type: FETCH_JSON,
      payload: newJson
    })
  }catch (e) {
    console.log(e)
  }
};

export const changeJson = (changes) => async dispatch => {
  try{
    dispatch({
      type: CHANGE_JSON,
      payload: changes
    })
  }catch (e) {
    console.log(e)
  }
};
