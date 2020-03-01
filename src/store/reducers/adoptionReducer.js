import * as type from '../actions/types';

const initialState = {
  adoptions: [],
  adoption: null,
  loading: true,
  message: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case type.GET_ADOPTIONS:
      return {
        ...state,
        adoptions: action.payload.data,
        loading: false
      }
    case type.GET_ADOPTION:
      return {
        ...state,
        adoption: action.payload.data
      }
    case type.UPDATE_ADOPTION:
      return {
        ...state,
        adoptions: state.adoptions.map(adoption => adoption._id === action.payload.data._id ? action.payload.data : adoption),
        adoption: action.payload.data,
        message: action.payload.message
      }
    case type.ADOPT_REQUEST:
      return {
        ...state,
        adoptions: [...state.adoptions, action.payload.data],
        message: action.payload.message,
        loading: false
      }
    case type.ADOPTIONS_LOADING:
      return {
        ...state,
        loading: true
      }
    case type.RESET_MESSAGE:
      return {
        ...state,
        message: null
      }
    default: 
      return state;
  }
}