/**
 * Klasik 
 */
import {MOVIES_SORT, SORT} from './types'

export const SortMovies = (type, movies) => dispatch => {
  dispatch ({
    type: SORT, payload: type
  })
  dispatch({
    type: MOVIES_SORT,payload: sortingFunc(type, movies)
  });
};

// Componentlerden gelecek sıralama isteğine göre sıralama yapar.
function sortingFunc(type, movies) {
    if (type === "Eklenme(Eskiden Yeniye)") {
      return movies.sort((a, b) => parseInt(a.addedDate) - parseInt(b.addedDate))
    } else if (type === "Eklenme(Yeniden Eskiye)") {
      return movies.sort((a, b) => parseInt(b.addedDate) - parseInt(a.addedDate))
    } else if (type === "Film Tarihi(Eskiden Yeniye)") {
      return movies.sort((a, b) => parseInt(a.movie_year) - parseInt(b.movie_year))
    } else if (type === "Film Tarihi(Yeniden Eskiye)") {
      return movies.sort((a, b) => parseInt(b.movie_year) - parseInt(a.movie_year))
    } else if (type === "Puana Göre(Artan)") {
      return movies.sort((a, b) => parseInt(a.movie_point) - parseInt(b.movie_point))
    } else if (type === "Puana Göre(Azalan)") {
      return movies.sort((a, b) => parseInt(b.movie_point) - parseInt(a.movie_point))
    }
}