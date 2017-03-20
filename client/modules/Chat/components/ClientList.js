import React, {Component, PropTypes} from 'react';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl';
import CloseIcon from 'grommet/components/icons/base/Close';
import ChatIcon from 'grommet/components/icons/base/Chat';
import Avatar from 'react-avatar';
import Radium from "radium";
import Spinning from 'grommet/components/icons/Spinning';

export class ClientList extends Component {

    componentDidMount() {
        this.props.fetchUsers();
        this.attempting = true;
    }

    updateChatUser = (user) => {
        this.props.updateCurrentChatUser(user);
    };

    render() {

        if (!this.attempting || this.props.usersFetching) {
            return (<div style={{ textAlign: 'center', paddingTop: '1rem' }}>
                      <Spinning size="large"/>
                    </div>)
        }

        let users = this.props.usersPayload;

        const clients = [];


        users.map((user, i) => {
            clients.push(
                <div key={i} style={i < 11 ? this.props.styles.clientWrapper : {}}>
                    <div
                        key={i}
                        style={this.props.styles.client}
                        onClick={() => this.updateChatUser(user)}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <div>
                                <Avatar facebookId={""} round={true} size={40} textSizeRatio={2.1}
                                        name={user.firstname + " " + user.lastname} src={''} />
                            </div>
                            <div style={{marginLeft: "0.7rem"}}>
                                <h3 style={{fontSize: "0.95rem", color: "#666", margin: "0"}}>{user.firstname} {user.lastname}</h3>
                                <span style={{fontSize: "0.9rem", color: "#888", margin: "0.25rem 0 0 0"}}>{this.props.calculateLastSeen(user, this.props.onlineList, this.props.wentOffline)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div style={this.props.styles.wrapper}>
                {clients}
            </div>
        );
    }
}

export default Radium(ClientList);
