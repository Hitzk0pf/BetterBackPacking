import React, {Component, PropTypes} from 'react';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl';
import CloseIcon from 'grommet/components/icons/base/Close';
import ChatIcon from 'grommet/components/icons/base/Chat';
import Avatar from 'react-avatar';

export class ClientList extends Component {

    render() {

        const clients = [];

        for (let i = 0; i < 12; i++) {
            clients.push(
                <div style={i < 11 ? this.props.styles.clientWrapper : {}}>
                    <div style={this.props.styles.client}>
                        <div style={{
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <div>
                                <Avatar facebookId={""} round={true} size={40} name={"Thomas Wedenig"} src={''}/>
                            </div>
                            <div>
                                <h3>Thomas Wedenig</h3>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div style={this.props.styles.wrapper}>
                {clients}
            </div>
        );
    }
}

export default ClientList;
