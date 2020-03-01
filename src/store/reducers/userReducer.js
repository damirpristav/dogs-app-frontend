import * as type from '../actions/types';

const initialState = {
  users: [],
  user: null,
  loading: true
};

export default (state = initialState, action) => {
  switch(action.type){
    case type.GET_ALL_USERS:
      return {
        ...state,
        users: action.payload.data,
        loading: false
      }
    case type.GET_USER:
      return {
        ...state,
        user: action.payload.data
      }
    case type.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload.data._id)
      }
    case type.USER_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state;
  }
}