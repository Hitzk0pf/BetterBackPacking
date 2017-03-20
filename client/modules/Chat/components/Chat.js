import React, {Component, PropTypes} from 'react';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl';
import CloseIcon from 'grommet/components/icons/base/Close';
import ChatIcon from 'grommet/components/icons/base/Chat';
import ChatBox from "./ChatBox";
import Radium from "radium";

export class Chat extends Component {

    constructor(props) {
      super(props);

      this.state = {
        showChat: false,
      }
    }

    toggleChat() {
      this.setState({showChat: !this.state.showChat});
    }

    render() {

        const styles = {
            wrapper: {
                position: "fixed",
                right: "3rem",
                bottom: "3rem"
            },
            chatButton: {
                wrapper: {
                    width: "3rem",
                    height: "3rem",
                    backgroundColor: "#FF6F00",
                    borderRadius: "100%",
                    textAlign: "center",
                    lineHeight: "3.7rem",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                    cursor: "pointer"
                }
            },
            chatBox: {
                wrapper: {
                    position: "absolute",
                    right: "0",
                    bottom: "5rem",
                    width: "20rem",
                    backgroundColor: "#fff",
                    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
                    zIndex: 99999,
                    borderRadius: "0.3rem",
                    overflow: "hidden"
                },
                content: {
                    width: "100%",
                    height: "20rem",
                    overflow: "auto"
                },
                header: {
                    width: "100%",
                    padding: "0.3rem 0.7rem 0.8rem",
                    boxSizing: "border-box",
                    backgroundColor: "#FF6F00"
                },
                footer: {
                    width: "100%",

                    inputWrap: {
                        padding: "0.7rem 0",
                        textAlign: "center",
                        borderTop: "0.1rem solid #eee"
                    },

                    newConversationWrap: {
                        width: "100%",
                        height: "4rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f5f5f5"
                    }

                }
            },
            clients: {
                wrapper: {

                },
                client: {
                    padding: "1rem",
                    boxSizing: "border-box",
                    cursor: "pointer",

                    ":hover": {
                        backgroundColor: "#fafafa"
                    }

                },
                clientWrapper: {
                    borderBottom: "0.1rem solid #eee"
                }
            }
        };

        return (
            <div style={styles.wrapper}>
                <div style={{position: "relative"}}>
                    {this.state.showChat && <ChatBox
                        styles={styles.chatBox}
                        clientsStyles={styles.clients}
                        updateCurrentChatUser={this.props.updateCurrentChatUser}
                        currentChatUser={this.props.currentChatUser}
                        fetchUsers={this.props.fetchUsers}
                        usersFetching={this.props.usersFetching}
                        usersPayload={this.props.usersPayload}
                        usersFailed={this.props.usersFailed}
                        sendMessage={this.props.sendMessage}
                        messageArray={this.props.messageArray}
                        onlineList={this.props.onlineList}
                    />}
                    <div style={styles.chatButton.wrapper} onClick={() => this.toggleChat()}>
                        <ChatIcon colorIndex={"light-1"} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
