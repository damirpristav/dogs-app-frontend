import axios from 'axios';
import * as type from './types';
import unauthorized from '../../utils/unauthorized';

// Get all notifications
export const getAllNotifications = () => async dispatch => {
  dispatch(setLoading());
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/notifications`);

    dispatch({
      type: type.GET_NOTIFICATIONS,
      payload: res.data
    });
  } catch (err) {
    unauthorized(err);
  }
}

// Get single notification
export const getNotification = id => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/notifications/${id}`);

    dispatch({
      type: type.GET_NOTIFICATION,
      payload: res.data
    });

    markNotificationAsSeen(id);
  } catch (err) {
    unauthorized(err);
  }
}

// Delete all notifications
export const deleteAllNotifications = () => async dispatch => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/notifications`);

    dispatch({
      type: type.DELETE_ALL_NOTIFICATIONS,
      payload: res.data
    });
  } catch (err) {
    unauthorized(err);
  }
}

// Delete single notification
export const deleteNotification = id => async dispatch => {
  try{
    const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/notifications/${id}`);

    dispatch({
      type: type.DELETE_NOTIFICATION,
      payload: res.data
    });
  } catch (err) {
    unauthorized(err);
  }
}

// Mark notification as seen
export const markNotificationAsSeen = id => async dispatch => {
  try {
    const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/notifications/seen/${id}`, {});

    dispatch({
      type: type.MARK_NOTIFICATION_AS_SEEN,
      payload: res.data
    });
  } catch (err) {
    unauthorized(err);
  }
}

// Set loading
const setLoading = () => {
  return {
    type: type.NOTIFICATIONS_LOADING,
    payload: true
  }
}