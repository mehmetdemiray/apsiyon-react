import { ADD_MOVIE, INCREASE_POINT, DECREASE_POINT, DELETE_MEDIA, SORT, TYPE } from '../actions/types';

const initialState = {
  moviesList: [
      {movie_name: "Taht Oyunları 1", movie_year: 2011, movie_point: 1, movie_type:"Film",movie_isVoted: "false", movie_id: '', 'movie_imdb': '' },
      {movie_name: "Taht Oyunları 2", movie_year: 1996, movie_point: 7, movie_type:"Dizi",movie_isVoted: "false", movie_id: '', 'movie_imdb': '' },
      {movie_name: "Taht Oyunları 3", movie_year: 2019, movie_point: 3, movie_type:"Film",movie_isVoted: "false", movie_id: '', 'movie_imdb': '' },
      {movie_name: "Taht Oyunları 4", movie_year: 2013, movie_point: 9, movie_type:"Dizi",movie_isVoted: "false", movie_id: '', 'movie_imdb': '' },
      {movie_name: "Taht Oyunları 5", movie_year: 1967, movie_point: 10, movie_type:"Film",movie_isVoted: "false", movie_id: '', 'movie_imdb': '' },
      {movie_name: "Taht Oyunları 6", movie_year: 2003, movie_point: 2, movie_type:"Dizi",movie_isVoted: "false", movie_id: '', 'movie_imdb': '' },
      {movie_name: "Taht Oyunları 7", movie_year: 2020, movie_point: -5, movie_type:"Film",movie_isVoted: "false", movie_id: '', 'movie_imdb': '' }
  ],
  movieTypes: ["Tümü", "Film", "Dizi", "Episode"],
  sortTypes: ["Puana Göre(Artan)", "Puana Göre(Azalan)", "Eklenme Zamanı"],
  sort: "Puana Göre(Artan)",
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
    case DELETE_MEDIA:
      return { ...state, moviesList:[
        ...state.moviesList.slice(0, action.payload),
        ...state.moviesList.slice(action.payload + 1)
      ]};
    case SORT:
      return { ...state, sort: action.payload };
    case TYPE:
      return { ...state, type: action.payload };
    default:
  }
  return state;
}