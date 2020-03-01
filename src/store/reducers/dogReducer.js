import * as type from '../actions/types';

const initalState = {
  dogs: [],
  dog: null,
  loading: true,
  message: null, 
  error: null,
  loadingDog: true
};

export default (state = initalState, action) => {
  switch(action.type) {
    case type.GET_DOGS:
      return {
        ...state,
        dogs: action.payload.data,
        loading: false
      }
    case type.GET_DOG:
      return {
        ...state,
        dog: action.payload.data,
        loadingDog: false
      }  
    case type.ADD_DOG:
      return {
        ...state,
        dogs: [...state.dogs, action.payload.data],
        message: `Dog "${action.payload.data.name}" successfully added!`,
        error: null
      }
    case type.UPDATE_DOG:
      return {
        ...state,
        dog: action.payload.data,
        dogs: state.dogs.map(dog => dog._id === action.payload.data._id ? action.payload.data : dog),
        message: `Dog "${action.payload.data.name}" successfully updated!`,
        error: null
      }
    case type.DELETE_DOG:
      return {
        ...state,
        dogs: state.dogs.filter(dog => dog._id !== action.payload.data._id),
        message: `Dog "${action.payload.data.name}" deleted!`,
        error: null
      }
    case type.SET_DOG_LOADING:
      return {
        ...state,
        loadingDog: true,
        dog: null
      }
    case type.SET_DOGS_LOADING:
      return {
        ...state,
        loading: true,
        dogs: []
      }
    case type.DOG_RESET:
      return {
        ...state,
        dog: null,
        loading: true
      }
    case type.RESET_MESSAGE:
      return {
        ...state,
        message: null
      }
    case type.SET_DOGS_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}