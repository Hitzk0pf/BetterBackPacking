import React, {Component, PropTypes} from 'react';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl';
import CloseIcon from 'grommet/components/icons/base/Close';
import ChatIcon from 'grommet/components/icons/base/Chat';
import Avatar from 'react-avatar';
import Radium from "radium";

export class ClientList extends Component {

    constructor(props) {
        super(props);
        console.log("convProps", this.props);
        if (this.props.user !== null)
            this.props.fetchMessages(this.props.user.cuid);
    }

    componentDidMount() {

    }

    render() {

        let messages = [];

        if (this.props.messagesAreFetching || this.props.messagesFetchingError)
            return null;

        messages = this.props.messages;

        console.log(messages);

        const styles = {
            message: {
                position: "relative",
                width: "100%",
                padding: "0 0.7rem",
                boxSizing: "border-box",
                display: "block",
                clear: "both",
            },
            messageSent: {
                display: "block",
                maxWidth: "80%",
                margin: "0.25rem 0",
                padding: "0.5rem",
                float: "right",
                backgroundColor: "#f5f5f5",
                borderRadius: "0.2rem",
                border: "0.1rem solid #eee"
            },
            messageReceived: {
                display: "inline-block",
                maxWidth: "80%",
                margin: "0.25rem 0",
                padding: "0.5rem",
                float: "left",
                backgroundColor: "#fff",
                borderRadius: "0.2rem",
                border: "0.1rem solid #eee"
            }
        };

        let oldMessages = messages.map(msg => (
            <div style={{display: 'block', width: '100%'}}>
                <div style={styles.message}>
                    <div key={msg.senderCuid + new Date().getTime()}
                         style={msg.senderCuid ? styles.messageReceived : styles.messageSent}>{msg.message}</div>
                </div>
            </div>
        ));

        let newMessages = this.props.messageArray.map(msg => (
            <div style={{display: 'block', width: '100%'}}>
                <div style={styles.message}>
                    <div key={msg.sender + new Date().getTime()}
                         style={msg.sender ? styles.messageReceived : styles.messageSent}>{msg.message}</div>
                </div>
            </div>
        ));

        return (
            <div>
                <div>
                    {oldMessages}
                </div>
                <div>
                    {newMessages}
                </div>
            </div>
        );
    }
}

export default Radium(ClientList);
