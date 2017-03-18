// Import Actions
import { TOGGLE_ADD_POST } from './ChatActions';

// Initial State
const initialState = {
  socketID: null,
  memberTyping: false,
  messageArray: [],
  notifyMessage: null,
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'receive_message':
      return Object.assign({}, { messageArray: state.messageArray.concat(state.messageArray, action.data), notifyMessage: action.data });
    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;

// Export Reducer
export default ChatReducer;
