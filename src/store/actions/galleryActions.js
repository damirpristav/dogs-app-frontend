import axios from 'axios';
import * as type from './types';
import unauthorized from '../../utils/unauthorized';

// Add image
export const addImage = (data) => async dispatch => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/gallery`, data);

    dispatch({
      type: type.ADD_IMAGE,
      payload: res.data
    });
  } catch (err) {
    unauthorized(err);
  }
}

// Get all images
export const getAllImages = () => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/gallery`);

    dispatch({
      type: type.GET_IMAGES,
      payload: res.data
    });
  } catch (err) {
    unauthorized(err);
  }
}

// Delete image
export const deleteImage = id => async dispatch => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/gallery/${id}`);

    dispatch({
      type: type.DELETE_IMAGE,
      payload: res.data
    });
  } catch (err) {
    unauthorized(err);
  }
}

export const resetImages = () => {
  return { type: type.RESET_IMAGES };
}