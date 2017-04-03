// Import Actions
import {
    SAVE_MESSAGE,
    FETCH_MESSAGES_FINISHED,
    FETCH_MESSAGES_ERROR,
    FETCH_MESSAGES_STARTED,
    FETCH_MESSAGES
} from './ChatActions';

// Initial State
const initialState = {
    socketID: null,
    memberTyping: false,
    messageArray: [],
    notifyMessage: null,
    onlineList: [],
    messagesAreFetching: false,
    messagesFetchingError: false,
    messages: []
};

const ChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'user_online':
            return Object.assign({}, state, {onlineList: state.onlineList.concat(action.data)});
        case 'user_offline':
            return Object.assign({}, state, {onlineList: state.onlineList.filter(user => user !== action.data)});
        case 'receive_message':
            return Object.assign({}, state, {
                messageArray: state.messageArray.concat(action.data),
                notifyMessage: action.data
            });
        case SAVE_MESSAGE:
            return Object.assign({}, state, {
                messageArray: state.messageArray.concat([{
                    message: action.message,
                    sender: null
                }])
            });
        case FETCH_MESSAGES_STARTED:
            return Object.assign({}, state, {
                messagesAreFetching: true
            });
        case FETCH_MESSAGES_FINISHED:
            return Object.assign({}, state, {
                messagesAreFetching: false,
                messagesFetchingError: false,
                messages: action.messages
            });
        case FETCH_MESSAGES_ERROR:
            return Object.assign({}, state, {
                messagesAreFetching: false,
                messagesFetchingError: true
            });
        default:
            return state;
    }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;

// Export Reducer
export default ChatReducer;
