// Import Actions
import { TOGGLE_ADD_POST } from './ChatActions';

// Initial State
const initialState = {
  socketID: null,
  memberTyping: false,
  message: null,
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'message':
      return Object.assign({}, { message: action.data });
    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;

// Export Reducer
export default ChatReducer;
