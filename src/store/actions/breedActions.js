import axios from 'axios';
import * as type from './types';
import unauthorized from '../../utils/unauthorized';

// Get all breeds
export const getBreeds = () => async dispatch => {
  dispatch(setBreedsLoading());
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/breed`);

    dispatch({
      type: type.GET_BREEDS,
      payload: res.data
    });
  } catch (err) {
    unauthorized(err);
    dispatch({
      type: type.BREED_ERROR,
      payload: err.response.data.message
    });
  }
}

// Get single breed
export const getBreed = (id) => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/breed/${id}`);

    dispatch({
      type: type.GET_BREED,
      payload: res.data
    });
  } catch (err) {
    unauthorized(err);
    dispatch({
      type: type.BREED_ERROR,
      payload: err.response.data.message
    });
  }
}

// Cleanup breed
export const cleanupBreed = () => dispatch => {
  dispatch({
    type: type.BREED_CLEANUP
  });
}

// Add new breed 
export const addBreed = (data) => async dispatch => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/breed`, data);

    dispatch({
      type: type.ADD_BREED,
      payload: res.data
    });
  } catch (err) {
    unauthorized(err);
    dispatch({
      type: type.BREED_ERROR,
      payload: err.response.data.message
    });
  }
}

// Update Breed
export const updateBreed = (id, data) => async dispatch => {
  try {
    const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/breed/${id}`, data);

    dispatch({
      type: type.UPDATE_BREED,
      payload: res.data
    });
  } catch (err) {
    unauthorized(err);
    dispatch({
      type: type.BREED_ERROR,
      payload: err.response.data.message
    });
  }
}

// Delete Breed
export const deleteBreed = id => async dispatch => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/breed/${id}`);

    dispatch({
      type: type.DELETE_BREED,
      payload: res.data
    });
  } catch (err) {
    unauthorized(err);
    dispatch({
      type: type.BREED_ERROR,
      payload: err.response.data.message
    });
  }
}

// Set loading
export const setBreedsLoading = () => {
  return {
    type: type.BREEDS_LOADING,
    payload: true
  }
}

export const resetBreedError = () => {
  return { type: type.RESET_BREED_ERROR }
}

export const resetBreeds = () => {
  return { type: type.RESET_BREEDS };
}