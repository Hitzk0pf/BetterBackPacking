import {
  GET_ALL_TOURS_STARTED,
  GET_ALL_TOURS_SUCCESS,
  GET_ALL_TOURS_FAILED,
  RESET_ALL_TOURS_PAYLOAD,
  SEARCH_TOUR_STARTED,
  SEARCH_TOUR_SUCCESS,
  SEARCH_TOUR_FAILED,
} from './TourActions';

// Initial State
const initialState = {
  getAllToursFetching: false,
  getAllToursPayload: [],
  getAllToursFailed: null,
};

const GuideReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TOURS_FAILED :
      return Object.assign({}, state, {
        getAllToursFetching: false,
        getAllToursFailed: true,
      });
    case GET_ALL_TOURS_SUCCESS :
      return Object.assign({}, state, {
        getAllToursFetching: false,
        getAllToursFailed: false,
        // append new tours to tour object (pagination)
        getAllToursPayload: state.getAllToursPayload.concat(action.tours),
      });
    case GET_ALL_TOURS_STARTED :
      return Object.assign({}, state, {
        getAllToursFetching: true,
        getAllToursFailed: null,
      });
    case RESET_ALL_TOURS_PAYLOAD :
      return Object.assign({}, state, {
        getAllToursPayload: [],
      });
    default:
      return state;
  }
};


/*
 // Get all posts
 export const getPosts = state => state.posts.data;

 // Get post by cuid
 export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];
 */

// Export Reducer
export default GuideReducer;
