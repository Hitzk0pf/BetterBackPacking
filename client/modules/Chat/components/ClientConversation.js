import React, {Component, PropTypes} from 'react';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl';
import CloseIcon from 'grommet/components/icons/base/Close';
import ChatIcon from 'grommet/components/icons/base/Chat';
import Avatar from 'react-avatar';
import Radium from "radium";

export class ClientList extends Component {

    componentDidMount() {
    }

    render() {

        const styles = {
            message: {
                position: "relative",
                width: "100%",
                padding: "0 0.7rem",
                boxSizing: "border-box",
                display: "block"
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

        let newMessages = this.props.messageArray.map(msg => (
            <div style={{display: 'block', width: '100%'}}>
              <div style={styles.message}>
                  <div key={msg.sender + new Date().getTime()} style={msg.sender ? styles.messageReceived : styles.messageSent}>{msg.message}</div>
              </div>
            </div>
        ))

        return (
            <div style={{padding: "0.7rem 0"}}>
                <div style={styles.message}>
                    <div style={styles.messageSent}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam!
                    </div>
                </div>
                <div style={styles.message}>
                    <div style={styles.messageReceived}>Consetetur sadipscing elitr, sed diam nonumy.</div>
                </div>
                {newMessages}
            </div>
        );
    }
}

export default Radium(ClientList);
