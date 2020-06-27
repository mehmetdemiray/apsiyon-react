import { THEME_COLOR } from '../actions/types';
import { MOVIE_TYPES } from '../actions/types';
import { DEVICE_TYPE } from '../actions/types';

const initialState = {
  themeColor: 'blue',
  themeTypes: ['brown', 'blue', 'pink'],
  deviceType: 'desktop'
};

export default function(state= initialState, action) {
  switch(action.type) {
    case THEME_COLOR:
      return { ...state, themeColor:action.payload };
    case DEVICE_TYPE:
      return { ...state, deviceType:action.payload };
    default:
  }
  return state;
}