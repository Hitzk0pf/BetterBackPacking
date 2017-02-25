import {
  ADD_GUIDE_INFO_FAILED,
  ADD_GUIDE_INFO_SUCCESS,
  FETCH_GUIDE_PROFILE_STARTED,
  FETCH_GUIDE_PROFILE_SUCCESS,
  FETCH_GUIDE_PROFILE_FAILED,
} from './GuideActions';

// Initial State
const initialState = {
  addGuideInfoSuccess: false,
  addGuideInfoError: null,
  guideProfileFetching: false,
  guideProfilePayload: null,
  guideProfileFailed: null,
};

const GuideReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GUIDE_INFO_FAILED :
      return Object.assign({}, state, {
        addGuideInfoSuccess: false,
        addGuideInfoError: 'Something went wrong while saving your data..',
      });
    case ADD_GUIDE_INFO_SUCCESS :
      return Object.assign({}, state, {
        addGuideInfoSuccess: true,
        addGuideInfoError: null,
      });
    case FETCH_GUIDE_PROFILE_STARTED :
      return Object.assign({}, state, {
        guideProfileFetching: true,
        guideProfileFailed: null,
        guideProfilePayload: null,
      });
    case FETCH_GUIDE_PROFILE_SUCCESS :
      return Object.assign({}, state, {
        guideProfileFetching: false,
        guideProfileFailed: false,
        guideProfilePayload: action.guideInfos,
      });
    case FETCH_GUIDE_PROFILE_FAILED :
      return Object.assign({}, state, {
        guideProfileFetching: false,
        guideProfileFailed: true,
        guideProfilePayload: null,
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
