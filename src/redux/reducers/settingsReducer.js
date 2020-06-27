import { THEME_COLOR } from '../actions/types';
import { MOVIE_TYPES } from '../actions/types';
import { DEVICE_TYPE } from '../actions/types';
import { INPAGE } from '../actions/types';
import { CURRENT_PAGE } from '../actions/types';
import { TOTAL_PAGE } from '../actions/types';

const initialState = {
  themeColor: 'blue',
  themeTypes: ['brown', 'blue', 'pink'],
  deviceType: 'desktop',
  inPage: 3,
  currentPage: 1,
  totalPage: 0
};

export default function(state= initialState, action) {
  switch(action.type) {
    case THEME_COLOR:
      return { ...state, themeColor:action.payload };
    case DEVICE_TYPE:
      return { ...state, deviceType:action.payload };
    case CURRENT_PAGE:
      return { ...state, currentPage:action.payload };
    case TOTAL_PAGE:
      return { ...state, totalPage:action.payload, currentPage: action.payload < state.currentPage ? action.payload : state.currentPage};
    default:
  }
  return state;
}