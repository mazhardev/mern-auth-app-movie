import {
  GET_ALL_MOVIES,
  GET_ALL_MOVIE,
  DELETE_MOVIE
} from '../actions/types';

const initialState = {
  movies: [],
  movie: [],
  loading: true
};

function questionReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_MOVIES:
      return {
        ...state,
        movies: payload
      };
    case GET_ALL_MOVIE:
      return {
        ...state,
        movie: payload,
        loading: false
      };
    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter(
          (movie) => movie._id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}

export default questionReducer;
