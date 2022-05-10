import api from '../utils/api';
import { setAlert } from './alert';
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GUEST_LINKS
} from './types';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth/user');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Login admin
export const loginAdmin = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post('/auth/login-admin', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Login User
export const loginUser = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post('/auth/login-user', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });

//is admin Login Page
export const setGuestLinks = () => ({
  type: GUEST_LINKS,
  payload: false
});

//is  user Login Page
export const setGuestLinksForUser = () => ({
  type: GUEST_LINKS,
  payload: true
});

// Register User
export const registerUser = (data) => async (dispatch) => {
  try {
    const res = await api.post('/auth/signup-user', data);

    dispatch(setAlert('User Registered', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};
