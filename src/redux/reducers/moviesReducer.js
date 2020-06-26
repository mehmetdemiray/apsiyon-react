import { ADD_MOVIE, SORT, TYPE } from '../actions/types';

const initialState = {
  moviesList: [
      {"movie_name": "Taht Oyunlarıııııııııııı", "movie_year": "2011", "movie_point": "6", "movie_type":"Film","movie_isVoted": "false" },
      {"movie_name": "Breaking Bad", "movie_year": "2008", "movie_point": "7", "movie_type":"Dizi", "movie_isVoted": "false" },
  ],
  movieTypes: ["Film", "Dizi", "Episode", "Hepsi"],
  sortTypes: ["Puana Göre(Artan)", "Puana Göre(Azalan)"],
  sort: "",
  type: ""
};

export default function(state= initialState, action) {
  switch(action.type) {
    case ADD_MOVIE:
      return { ...state, moviesList:[...state.moviesList, action.payload] };
  case SORT:
    return { ...state, sort: action.payload };
  case TYPE:
    return { ...state, type: action.payload };
    default:
  }
  return state;
}