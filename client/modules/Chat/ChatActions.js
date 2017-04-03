import callApi from '../../util/apiCaller';

// Export Constants
export const SEND_MESSAGE = 'server/send_message';
export const SAVE_MESSAGE = 'SAVE_MESSAGE';
export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const FETCH_MESSAGES_STARTED = "FETCH_MESSAGES_STARTED";
export const FETCH_MESSAGES_FINISHED = "FETCH_MESSAGES_STARTED";
export const FETCH_MESSAGES_ERROR = "FETCH_MESSAGES_ERROR";

// Export Actions
function sendMessageToSocket(message, receivers) {
    return {
        type: SEND_MESSAGE,
        message,
        receivers,
    };
}

function saveMessage(message, receivers) {
    return {
        type: SAVE_MESSAGE,
        message,
        receivers,
    };
}

export function sendMessage(message, receivers) {
    return (dispatch) => {
        dispatch(sendMessageToSocket(message, receivers));
        dispatch(saveMessage(message, receivers));
    }
}


export function fetchMessagesFinished(messages) {
    //if 404, throw error instead of finished
    if (!messages) {
        return (dispatch) => {
            dispatch(fetchMessagesError());
        }
    }
    return {
        type: FETCH_MESSAGES_FINISHED,
        messages,
    };
}

export function fetchMessagesStarted() {
    return {
        type: FETCH_MESSAGES_STARTED,
    };
}

export function fetchMessagesError() {
    return {
        type: FETCH_MESSAGES_ERROR,
    };
}

export function fetchMessages(userCuid) {
    //async action propagating a start of the fetching process
    return (dispatch) => {
        dispatch(fetchMessagesStarted());
        const token = localStorage.getItem('token');
        return callApi(`chatMessages/${userCuid}`, 'get', token).then(res => dispatch(fetchMessagesFinished(res.messages)));
    }
}