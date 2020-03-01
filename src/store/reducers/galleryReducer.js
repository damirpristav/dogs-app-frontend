import * as type from '../actions/types';

const initialState = {
  images: [],
  loading: true,
  message: null
}

export default (state = initialState, action) => {
  switch(action.type){
    case type.ADD_IMAGE:
      return {
        ...state,
        images: [...state.images, action.payload.data],
        loading: false,
        message: `Image "${action.payload.data.image}" successfully added!`
      }
    case type.GET_IMAGES:
      return {
        ...state,
        images: action.payload.data,
        loading: false
      }
    case type.DELETE_IMAGE:
      return {
        ...state,
        images: state.images.filter(img => img._id !== action.payload.data._id),
        loading: false,
        message: `Image "${action.payload.data.image}" deleted!`
      }
    case type.RESET_MESSAGE:
      return {
        ...state,
        message: null
      }
    case type.RESET_IMAGES:
      return {
        ...state,
        loading: true,
        images: []
      }
    default:
      return state;
  }
}