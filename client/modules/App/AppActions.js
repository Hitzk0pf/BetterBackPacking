// Export Constants
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
export const UPDATE_CURRENT_CHAT_USER = "UPDATE_CURRENT_CHAT_USER";

// Export Actions
export function toggleAddPost() {
    return {
        type: TOGGLE_ADD_POST
    };
}

export function updateCurrentChatUser(userCuid) {
    return {
        type: UPDATE_CURRENT_CHAT_USER,
        userCuid
    }
}
