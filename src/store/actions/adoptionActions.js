import axios from 'axios';
import * as type from './types';
import unauthorized from '../../utils/unauthorized';

// Get all adoptions
export const getAllAdoptions = () => async dispatch => {
  dispatch(setLoading());
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/adoptions`);

    dispatch({
      type: type.GET_ADOPTIONS,
      payload: res.data
    });
  } catch (err) {
    unauthorized(err);
  }
}

// Get adoption
export const getAdoption = id => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/adoptions/${id}`);

    dispatch({
      type: type.GET_ADOPTION,
      payload: res.data
    });
  } catch (err) {
    unauthorized(err);
  }
}

// Adopt request
export const adoptRequest = (dogid) => async dispatch => {
  dispatch(setLoading());
  try {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/adoptions/dog/${dogid}`, {});

    dispatch({
      type: type.ADOPT_REQUEST,
      payload: res.data
    });
  } catch (err) {
    unauthorized(err);
  }
}

// Update adoption
export const updateAdoption = (id, data) => async dispatch => {
  try {
    const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/adoptions/${id}`, data);

    dispatch({
      type: type.UPDATE_ADOPTION,
      payload: res.data
    });
  } catch (err) {
    unauthorized(err);
  }
}

// Set loading
const setLoading = () => {
  return {
    type: type.ADOPTIONS_LOADING
  }
}