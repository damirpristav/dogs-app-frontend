import * as type from '../actions/types';

const initialState = {
  breeds: [],
  breed: null,
  loading: true,
  message: null,
  error: null
};

export default (state = initialState, action) => {
  switch(action.type){
    case type.GET_BREEDS:
      return {
        ...state,
        breeds: action.payload.data,
        loading: false
      }
    case type.GET_BREED:
      return {
        ...state,
        breed: action.payload.data
      }
    case type.ADD_BREED:
      return {
        ...state,
        breeds: [...state.breeds, action.payload.data],
        message: `New breed "${action.payload.data.name}" successfully created!`,
        error: null
      }
    case type.UPDATE_BREED:
      return {
        ...state,
        breeds: state.breeds.map(breed => breed._id === action.payload.data._id ? action.payload.data : breed),
        message: `Breed "${action.payload.data.name}" updated!`,
        error: null
      }
    case type.DELETE_BREED:
      return {
        ...state,
        breeds: state.breeds.filter(breed => breed._id !== action.payload.data._id),
        message: `Breed "${action.payload.data.name}" deleted!`,
        error: null
      }
    case type.BREED_CLEANUP:
      return {
        ...state,
        breed: null
      }
    case type.BREEDS_LOADING:
      return {
        ...state,
        loading: true
      }
    case type.BREED_MESSAGE:
      return {
        ...state,
        message: null
      }
    case type.BREED_ERROR:
      return {
        ...state,
        error: action.payload,
        message: null
      }
    case type.RESET_MESSAGE:
      return {
        ...state,
        message: null
      }
    case type.RESET_BREED_ERROR: 
      return {
        ...state,
        error: null
      }
    case type.RESET_BREEDS:
      return {
        ...state,
        breeds: [],
        loading: true
      }
    default:
      return state;
  }
}