import {
  FETCH_JSON,
  CHANGE_JSON,

} from "./actionType";
import store from '../store'
import json from '../../state'

export const fetchJson = () => async dispatch => {
  let newJson = [];
  // let text = '';
  // json.map(item => {
  //  item.text.split('').map(el => {
  //    text += el;
  //   newJson.push({
  //     text: el,
  //     fontSize: item.fontSize,
  //     color: item.color,
  //     })
  //   })
  // });
  // console.log(newJson, 444)
  try{
    dispatch({
      type: FETCH_JSON,
      payload: json,
      // text: text
    })
  }catch (e) {
    console.log(e)
  }
};

export const changeJson = (full, selected) => async dispatch => {
  let json = store.getState().posts.json;
  let test = json.find(item => item.text === full);
  console.log(test, 4444);
  json.push({
    text: selected,
    backgroundColor: 'gold'
  })
  try{
    dispatch({
      type: CHANGE_JSON,
      payload: json
    })
  }catch (e) {
    console.log(e)
  }
};
