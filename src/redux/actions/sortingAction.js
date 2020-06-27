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
    if (type === "Eklenme Zamanı") {
      return movies
    } else if (type === "Puana Göre(Artan)") {
      return movies.sort((a, b) => parseInt(a.movie_point) - parseInt(b.movie_point))
    } else if (type === "Puana Göre(Azalan)") {
      return movies.sort((a, b) => parseInt(b.movie_point) - parseInt(a.movie_point))
    }
}