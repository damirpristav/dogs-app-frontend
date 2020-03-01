import { combineReducers } from 'redux';

import authReducer from './authReducer';
import dogReducer from './dogReducer';
import breedReducer from './breedReducer';
import adoptionReducer from './adoptionReducer';
import notificationReducer from './notificationReducer';
import userReducer from './userReducer';
import galleryReducer from './galleryReducer';

export default combineReducers({
  auth: authReducer,
  dog: dogReducer,
  breed: breedReducer,
  adoption: adoptionReducer,
  notification: notificationReducer,
  user: userReducer,
  gallery: galleryReducer
});