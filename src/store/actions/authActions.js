import axios from 'axios';
import * as type from './types';

// Login
export const login = (data) => async dispatch => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`, data, {
      withCredentials: true
    });
    
    dispatch({
      type: type.LOGIN,
      payload: res.data
    });
  }catch(err) {
    dispatch({ 
      type: type.SET_AUTH_ERROR, 
      payload: err.response.data.message 
    });
  }
}

// Register
export const register = (data) => async dispatch => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/register`, data);

    dispatch({ 
      type: type.REGISTER, 
      payload: res.data
    });
  }catch(err) {
    dispatch({ 
      type: type.SET_AUTH_ERROR, 
      payload: err.response.data.message 
    });
  }
}

// Check token to stayed logged in on page refresh
export const checkToken = () => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/checkToken`);

    dispatch({
      type: type.CHECK_TOKEN,
      payload: res.data
    });
  }catch(err) {
    dispatch({
      type: type.CHECK_TOKEN,
      payload: err.response.data
    });
  }
}

// Logout
export const logout = () => async dispatch => {
  dispatch(setScreenLoading());
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/logout`);

    dispatch({
      type: type.LOGOUT,
      payload: res.data
    });
  }catch(err) {
    // console.log(err.response);
  }
}

// Activate account
export const activateAccount = (token) => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/activateAccount/${token}`);

    dispatch({
      type: type.ACTIVATE_ACCOUNT,
      payload: res.data
    });
  }catch(err) {
    // console.log(err.response);
    dispatch({
      type: type.ACTIVATE_ACCOUNT,
      payload: err.response.data
    });
  }
}

// Forogt Password 
export const forgotPassword = (data) => async dispatch => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/forgotPassword`, data);

    dispatch({
      type: type.FORGOT_PASSWORD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: type.FORGOT_PASSWORD,
      payload: err.response.data
    });
  }
}

// Reset Password
export const resetPassword = (token, data) => async dispatch => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/resetPassword/${token}`, data);

    dispatch({
      type: type.RESET_PASSWORD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: type.RESET_PASSWORD,
      payload: err.response.data
    });
  }
}

// Set redirect after login
export const setRedirect = (path) => dispatch => {
  dispatch({
    type: type.SET_REDIRECT,
    payload: path
  });
}

export const resetAuthError = () => {
  return{ type: type.RESET_AUTH_ERROR };
}

export const resetAuthMessage = () => {
  return{ type: type.RESET_AUTH_MESSAGE };
}

export const setScreenLoading = () => {
  return{ type: type.SET_SCREEN_LOADING };
}

export const unsetScreenLoading = () => {
  return{ type: type.UNSET_SCREEN_LOADING };
}