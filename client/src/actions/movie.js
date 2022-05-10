import api from '../utils/api';
import { setAlert } from './alert';
import {
  ADD_MOVIE,
  GET_ALL_MOVIES,
  GET_ALL_MOVIE,
  AUTH_ERROR,
  DELETE_MOVIE
} from './types';

// Add Movie
export const addMovie = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/movies', formData);

    dispatch({
      type: ADD_MOVIE,
      payload: res.data
    });

    dispatch(setAlert('Movie Created', 'success'));
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// get all Movies by user
export const getAllMovies = () => async (dispatch) => {
  try {
    const res = await api.get('/movies-by-user');

    dispatch({
      type: GET_ALL_MOVIES,
      payload: res.data
    });

  } catch (err) {
    console.log(err);
  }
};

// get all Movies 
export const getAllMoviesAdmin = () => async (dispatch) => {
  try {
    const res = await api.get('/movies');

    dispatch({
      type: GET_ALL_MOVIES,
      payload: res.data
    });

  } catch (err) {
    console.log(err);
  }
};

// delete Movie
export const deleteMovie = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/movies/${id}`);

    console.log(res);
    dispatch({
      type: DELETE_MOVIE,
      payload:id
    });

    dispatch(setAlert('Movie deleted', 'success'));
  } catch (err) {
    console.log(err);
  }
};

// get Movie by id
export const getMovieById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/movies/${id}`);
    dispatch({
      type: GET_ALL_MOVIE,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};


// Edit Movie
export const editMovieById = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/movies/${id}`, formData);
    dispatch(setAlert('Movie Updated', 'success'));
  } catch (err) {
    dispatch(setAlert(err, 'danger'));
  }
};
