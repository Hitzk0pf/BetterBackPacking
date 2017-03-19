// Export Constants
export const SEND_MESSAGE = 'server/send_message';
export const SAVE_MESSAGE = 'SAVE_MESSAGE';

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
