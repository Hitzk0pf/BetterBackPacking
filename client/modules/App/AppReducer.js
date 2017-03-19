// Import Actions
import {TOGGLE_ADD_POST, UPDATE_CURRENT_CHAT_USER} from './AppActions';

// Initial State
const initialState = {
    showAddPost: false,
    currentChatUser: null
};

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_ADD_POST:
            return {
                showAddPost: !state.showAddPost,
            };

        case UPDATE_CURRENT_CHAT_USER:
            return Object.assign({}, state, {
                currentChatUser: action.user
            });
        default:
            return state;
    }
};

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;

// Export Reducer
export default AppReducer;
