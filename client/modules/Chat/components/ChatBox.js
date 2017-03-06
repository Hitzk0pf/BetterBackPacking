import React, {Component, PropTypes} from 'react';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl';
import CloseIcon from 'grommet/components/icons/base/Close';
import ChatIcon from 'grommet/components/icons/base/Chat';
import Button from 'grommet/components/Button';

import ClientList from "./ClientList";

export class ChatButton extends Component {

    render() {

        const styles = {};

        return (
            <div style={this.props.styles.wrapper}>

                <div style={this.props.styles.header}>
                    <h2 style={{color: "#fff", fontSize: "1.1rem", margin: "0"}}>Chat</h2>
                    <h3 style={{
                        color: "#fff",
                        fontSize: "0.9rem",
                        fontWeight: "400",
                        lineHeight: "0.5rem",
                        margin: "0"
                    }}>Contacts</h3>

                </div>

                <div style={this.props.styles.content}>
                    <div style={{
                        width: "100%",
                        margin: "auto"
                    }}>
                        <ClientList styles={this.props.clientsStyles} />
                    </div>
                </div>

                {/*<div style={this.props.styles.footer.inputWrap}>

                 </div>*/}

                {<div style={this.props.styles.footer.newConversationWrap}>

                    <Button label='New Conversation'
                            href='#'
                            primary={true}
                            accent={false}
                            secondary={false}
                            plain={false}
                    />

                </div>}

            </div>
        );
    }
}

export default ChatButton;
