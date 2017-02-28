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
                                <Avatar facebookId={""} round={true} size={40} textSizeRatio={2.1} name={"Thomas Wedenig"} src={''}/>
                            </div>
                            <div style={{marginLeft: "0.7rem"}}>
                                <h3 style={{fontSize: "0.95rem", color: "#666", margin: "0"}}>Thomas Wedenig</h3>
                                <span style={{fontSize: "0.9rem", color: "#888", margin: "0.25rem 0 0 0"}}>latest message her...</span>
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
