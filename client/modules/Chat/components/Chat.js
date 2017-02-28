import React, {Component, PropTypes} from 'react';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl';
import CloseIcon from 'grommet/components/icons/base/Close';
import ChatIcon from 'grommet/components/icons/base/Chat';
import ChatBox from "./ChatBox";

export class Chat extends Component {

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
                    zIndex: 99999
                },
                content: {
                    width: "100%",
                    height: "20rem",
                    overflow: "auto"
                },
                header: {
                    width: "100%",
                    height: "3.5rem",
                    boxSizing: "border-box",
                    backgroundColor: "#FF6F00"
                },
                footer: {
                    width: "100%",
                    height: "3rem",
                    backgroundColor: "#f5f5f5"
                }
            },
            clients: {
                wrapper: {

                },
                client: {
                    padding: "1rem",
                    boxSizing: "border-box"
                },
                clientWrapper: {
                    borderBottom: "0.1rem solid #eee"
                }
            }
        };

        return (
            <div style={styles.wrapper}>
                <div style={{position: "relative"}}>
                    <ChatBox styles={styles.chatBox} clientsStyles={styles.clients}/>
                    <div style={styles.chatButton.wrapper}>
                        <ChatIcon colorIndex={"light-1"}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;