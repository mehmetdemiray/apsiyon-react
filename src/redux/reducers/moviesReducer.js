import { ADD_MOVIE, INCREASE_POINT, DECREASE_POINT, DELETE_MEDIA, SORT, TYPE, MOVIES_SORT } from '../actions/types';

const initialState = {
  moviesList:[
    {movie_name:'The Spoils of War',movie_year:2017,movie_point:4,movie_type:'Episode',movie_isVoted:'false',movie_id:'tt5775846', addedDate: 1593357138},
    {movie_name:'Vikings',movie_year:2013,movie_point:4,movie_type:'Dizi',movie_isVoted:'false',movie_id:'tt2306299', addedDate: 1593357140},
    {movie_name:'Indiana Jones',movie_year:1981,movie_point:9,movie_type:'Film',movie_isVoted:'false',movie_id:'tt0082971', addedDate: 1593357142},
    {movie_name:'Sunset Blvd.',movie_year:1950,movie_point:8,movie_type:'Film',movie_isVoted:'false',movie_id:'tt0043014', addedDate: 1593357143},
    {movie_name:'Forbidden Love',movie_year:2008,movie_point:12,movie_type:'Dizi',movie_isVoted:'false',movie_id:'tt1286677', addedDate: 1593357144},
    {movie_name:'Awakenings',movie_year:1990,movie_point:8,movie_type:'Film',movie_isVoted:'false',movie_id:'tt0099077', addedDate: 1593357145},
    {movie_name:'A Beautiful Mind',movie_year:2001,movie_point:8,movie_type:'Film',movie_isVoted:'false',movie_id:'tt0268978', addedDate: 1593357146},
    {movie_name:'The Legend of Ron Burgundy',movie_year:2004,movie_point:7,movie_type:'Film',movie_isVoted:'false',movie_id:'tt0357413', addedDate: 1593357147},
    {movie_name:'Popcultured',movie_year:2005,movie_point:3,movie_type:'Dizi',movie_isVoted:'false',movie_id:'tt0465347', addedDate: 1593357148},
    {movie_name:'Breaking Bad',movie_year:2008,movie_point:10,movie_type:'Dizi',movie_isVoted:'false',movie_id:'tt0903747', addedDate: 1593357149},
    {movie_name:'Charlie Work',movie_year:2015,movie_point:8,movie_type:'Episode',movie_isVoted:'false',movie_id:'tt3767938', addedDate: 1593357150},
    {movie_name:'Parks and Recreation',movie_year:2009,movie_point:9,movie_type:'Dizi',movie_isVoted:'false',movie_id:'tt1266020', addedDate: 1593357151},
    {movie_name:'The X-Files',movie_year:1993,movie_point:16,movie_type:'Dizi',movie_isVoted:'false',movie_id:'tt0106179', addedDate: 1593357152},
    {movie_name:'Capernaum',movie_year:2018,movie_point:11,movie_type:'Film',movie_isVoted:'false',movie_id:'tt8267604', addedDate: 1593357153},
    {movie_name:'Coco',movie_year:2017,movie_point:8,movie_type:'Film',movie_isVoted:'false',movie_id:'tt2380307', addedDate: 1593357154},
    {movie_name:'Amélie',movie_year:2001,movie_point:8,movie_type:'Film',movie_isVoted:'false',movie_id:'tt0211915', addedDate: 1593357155}
  ],
  movieTypes: ["Tümü", "Film", "Dizi", "Episode"],
  sortTypes: ["Puana Göre(Artan)", "Puana Göre(Azalan)", "Eklenme(Eskiden Yeniye)", "Eklenme(Yeniden Eskiye)", "Film Tarihi(Eskiden Yeniye)", "Film Tarihi(Yeniden Eskiye)"],
  sorts: "Eklenme(Eskiden Yeniye)",
  type: "Tümü"
};

export default function(state= initialState, action) {
  switch(action.type) {
    case ADD_MOVIE:
      return { ...state, moviesList:[...state.moviesList, action.payload] };
    case MOVIES_SORT:
      return { ...state, moviesList: action.payload};
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
      return { ...state, sorts: action.payload };
    case TYPE:
      return { ...state, type: action.payload };
    default:
  }
  return state;
}