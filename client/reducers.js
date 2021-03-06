/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import posts from './modules/Post/PostReducer';
import intl from './modules/Intl/IntlReducer';
import user from './modules/User/UserReducer';
import guide from './modules/Guide/GuideReducer';
import chat from './modules/Chat/ChatReducer';
import tour from './modules/Tour/TourReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  intl,
  user,
  guide,
  tour,
  chat,
});
