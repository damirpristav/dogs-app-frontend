import * as type from '../actions/types';

const initialState = {
  isAuthorized: false,
  user: null,
  redirect: null,
  error: null,
  message: null,
  screenLoading: true,
  activateAccountMessage: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case type.LOGIN:
      return {
        ...state,
        isAuthorized: action.payload.success,
        user: action.payload.data
      }
    case type.REGISTER:
      return {
        ...state,
        message: action.payload.message
      }
    case type.CHECK_TOKEN:
      return {
        ...state,
        isAuthorized: action.payload.success,
        user: action.payload.data,
        screenLoading: false
      }
    case type.LOGOUT:
      return {
        ...state,
        isAuthorized: false,
        user: null,
        screenLoading: false
      }
    case type.ACTIVATE_ACCOUNT:
      return {
        ...state,
        activateAccountMessage: action.payload.message
      }
    case type.FORGOT_PASSWORD:
      return {
        ...state,
        message: action.payload.message
      }
    case type.RESET_PASSWORD:
      return {
        ...state,
        message: action.payload.message
      }
    case type.SET_REDIRECT:
      return {
        ...state,
        redirect: action.payload
      }
    case type.SET_AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case type.RESET_AUTH_ERROR:
      return {
        ...state,
        error: null
      }
    case type.RESET_AUTH_MESSAGE:
      return {
        ...state,
        message: null
      }
    case type.SET_SCREEN_LOADING:
      return {
        ...state,
        screenLoading: true
      }
    case type.UNSET_SCREEN_LOADING:
      return {
        ...state,
        screenLoading: false
      }
    default:
      return state;
  }
}