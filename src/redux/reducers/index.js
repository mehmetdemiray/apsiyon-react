import { combineReducers } from "redux";
import settingsReducer from "./settingsReducer";
import moviesReducer from "./moviesReducer";

export default combineReducers({
  SETTINGS: settingsReducer,
  MOVIES: moviesReducer
});
