import axios from 'axios';
import * as type from './types';
import unauthorized from '../../utils/unauthorized';

// Get all users
export const getAllUsers = () => async dispatch => {
  dispatch(setLoading());
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users`);

    dispatch({
      type: type.GET_ALL_USERS,
      payload: res.data
    });
  } catch (err) {
    unauthorized(err);
  }
}

// Get single user
export const getUser = id => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${id}`);

    dispatch({
      type: type.GET_USER,
      payload: res.data
    });
  } catch (err) {
    unauthorized(err);
  }
}

// Delete user
export const deleteUser = id => async dispatch => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${id}`);

    dispatch({
      type: type.DELETE_USER,
      payload: res.data
    });
  } catch (err) {
    unauthorized(err);
  }
}

// Set loading
const setLoading = () => {
  return {
    type: type.USER_LOADING,
    payload: true
  }
}