import React, {Component, PropTypes} from 'react';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl';
import CloseIcon from 'grommet/components/icons/base/Close';
import ChatIcon from 'grommet/components/icons/base/Chat';

export class ChatButton extends Component {

    render() {

        const styles = {};

        return (
            <div style={this.props.styles.wrapper}>
                <div style={this.props.styles.content}>
                    <div style={this.props.styles.header}>
                    </div>

                    <div style={this.props.styles.footer}>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatButton;
