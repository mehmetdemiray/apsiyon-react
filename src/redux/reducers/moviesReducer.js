import { ADD_MOVIE, INCREASE_POINT, DECREASE_POINT, SORT, TYPE } from '../actions/types';

const initialState = {
  moviesList: [
      {movie_name: "Taht Oyunlarıııııııııııı", movie_year: 2011, movie_point: 1, movie_type:"Film",movie_isVoted: "false", movie_id: '', 'movie_imdb': '' }
  ],
  movieTypes: ["Tümü", "Film", "Dizi", "Episode"],
  sortTypes: ["Puana Göre(Artan)", "Puana Göre(Azalan)"],
  sort: "",
  type: "Tümü"
};

export default function(state= initialState, action) {
  switch(action.type) {
    case ADD_MOVIE:
      return { ...state, moviesList:[...state.moviesList, action.payload] };
    case INCREASE_POINT:
      return { ...state, moviesList: state.moviesList.map(
        (movie, i) => i === action.payload ? {...movie, "movie_point": movie.movie_point + 1 } : movie
      )};
    case DECREASE_POINT:
      return { ...state, moviesList: state.moviesList.map(
        (movie, i) => i === action.payload ? {...movie, "movie_point": movie.movie_point - 1 } : movie
      )};
    case SORT:
      return { ...state, sort: action.payload };
    case TYPE:
      return { ...state, type: action.payload };
    default:
  }
  return state;
}