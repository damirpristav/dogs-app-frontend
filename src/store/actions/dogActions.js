import axios from 'axios';
import * as type from './types';
import unauthorized from '../../utils/unauthorized';

// Get all dogs
export const getAllDogs = (query) => async dispatch => {
  try {
    let dogs;
    if(query) {
      dogs = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dogs?${query}`);
    }else {
      dogs = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dogs`);
    }

    dispatch({
      type: type.GET_DOGS,
      payload: dogs.data
    });
  } catch (err) {
    dispatch({
      type: type.SET_DOGS_ERROR,
      payload: err.response.data.message
    });
  } 
}

// Get dog by slug
export const getDog = (slug) => async dispatch => {
  try {
    const dog = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dogs/${slug}`);

    dispatch({
      type: type.GET_DOG,
      payload: dog.data
    });
  } catch (err) {
    dispatch({
      type: type.SET_DOGS_ERROR,
      payload: err.response.data.message
    });
  } 
}

// Add dog
export const addDog = (data) => async dispatch => {
  try {
    const dog = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dogs`, data);

    dispatch({
      type: type.ADD_DOG,
      payload: dog.data
    });
  } catch (err) {
    unauthorized(err);
    dispatch({
      type: type.SET_DOGS_ERROR,
      payload: err.response.data.message
    });
  }
}

// Update dog
export const updateDog = (id, data) => async dispatch => {
  try {
    const dog = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dogs/${id}`, data);

    dispatch({
      type: type.UPDATE_DOG,
      payload: dog.data
    });
  } catch (err) {
    unauthorized(err);
    dispatch({
      type: type.SET_DOGS_ERROR,
      payload: err.response.data.message
    });
  }
}

// Delete dog
export const deleteDog = (id) => async dispatch => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dogs/${id}`);

    dispatch({
      type: type.DELETE_DOG,
      payload: res.data
    });
  } catch (err) {
    unauthorized(err);
  }
}

// Set loading to true for dog
export const setDogLoading = () => dispatch => {
  dispatch({
    type: type.SET_DOG_LOADING
  });
}

// Set loading to true for dogs
export const setDogsLoading = () => dispatch => {
  dispatch({
    type: type.SET_DOGS_LOADING
  });
}

// Cleanup dog
export const resetDog = () => dispatch => {
  dispatch({
    type: type.DOG_RESET
  });
}