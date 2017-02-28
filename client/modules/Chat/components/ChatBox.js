import React, {Component, PropTypes} from 'react';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl';
import CloseIcon from 'grommet/components/icons/base/Close';
import ChatIcon from 'grommet/components/icons/base/Chat';
import ClientList from "./ClientList";

export class ChatButton extends Component {

    render() {

        const styles = {};

        return (
            <div style={this.props.styles.wrapper}>

                <div style={this.props.styles.header}>
                </div>

                <div style={this.props.styles.content}>
                    <div style={{
                        width: "100%",
                        margin: "auto"
                    }}>
                        <ClientList styles={this.props.clientsStyles} />
                    </div>
                </div>

                <div style={this.props.styles.footer}>
                </div>

            </div>
        );
    }
}

export default ChatButton;
