import { combineReducers } from "redux";
import settingsReducer from "./settingsReducer";
import moviesReducer from "./moviesReducer";
// İki tip reducer tipi tuttum.
// Genel ayarlar için: SETTINGS
// Film ayarları için: MOVUES
// Burası reducer'ları birleştiriyor. store.js içerisinde de tek bir store haline getiriliyor.
export default combineReducers({
  SETTINGS: settingsReducer,
  MOVIES: moviesReducer
});
