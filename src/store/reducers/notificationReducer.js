import * as type from '../actions/types';

const initialState = {
  notifications: [],
  notification: null,
  loading: true
};

export default (state = initialState, action) => {
  switch(action.type) {
    case type.GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload.data,
        loading: false
      }
    case type.GET_NOTIFICATION:
      return {
        ...state,
        notification: action.payload.data
      }
    case type.DELETE_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
        notification: null
      }
    case type.DELETE_NOTIFICATION:
      return {
        ...state,
        notification: null,
        notifications: state.notifications.filter(not => not._id !== action.payload.data._id)
      }
    case type.MARK_NOTIFICATION_AS_SEEN:
      return {
        ...state,
        notification: action.payload.data,
        notifications: state.notifications.map(notification => notification._id === action.payload.data._id ? action.payload.data : notification)
      }
    case type.NOTIFICATIONS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}