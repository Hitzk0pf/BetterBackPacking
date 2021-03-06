import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Chat from '../Chat/components/Chat';
import NotificationSystem from 'react-notification-system';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Import Actions
import {updateCurrentChatUser} from './AppActions';
import {switchLanguage} from '../../modules/Intl/IntlActions';
import {authUser, logoutUser, fetchUsers} from '../User/UserActions';
import { sendMessage, fetchMessages } from '../Chat/ChatActions';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {isMounted: false};
    }

    componentDidMount() {
        this.setState({isMounted: true}); // eslint-disable-line
        this.props.authUser();
        // tell socket server that the user is online - ready to chat
        // this.props.dispatch({type: 'server/is_online', token: this.props.user.token});
        // this.props.isOnline(this.props.user.token);
    }

    componentWillReceiveProps(newProps) {
      if (newProps.notifyMessage !== this.props.notifyMessage && newProps.notifyMessage !== undefined) {
        this._addNotification(newProps.notifyMessage, newProps.usersPayload)
      }
    }

    _addNotification (message, users) {
      const senderUser = users.filter(user => user.cuid === message.sender)[0]
      const title = senderUser.firstname + " " + senderUser.lastname;
      this.refs.notificationSystem.addNotification({
          title,
          message: message.message,
          level: 'success',
          position: 'tr',
      })
    }

    render() {

        return (
            <div>
                {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' &&
                <DevTools />}
                <div>
                    <Helmet
                        title="MERN Starter - Blog App"
                        titleTemplate="%s - BBP"
                        meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}

                    />
                    <NotificationSystem ref="notificationSystem" />
                    <Header
                        switchLanguage={lang => this.props.switchLanguage(lang)}
                        intl={this.props.intl}
                        avatar={this.props.user.avatar}
                        isGuide={this.props.user.user ? this.props.user.user.isGuide : null}
                        isLoggedIn={this.props.user.loggedIn}
                        cuid={this.props.user.user ? this.props.user.user.cuid : null}
                        logoutUser={() => this.props.logoutUser()}
                        chat={this.props.testChat}
                    />
                    <div className={styles.container}>
                        {this.props.children}
                    </div>
                    <Footer />
                </div>
                <Chat
                    updateCurrentChatUser={this.props.updateCurrentChatUser}
                    currentChatUser={this.props.currentChatUser}
                    fetchUsers={this.props.fetchUsers}
                    usersFetching={this.props.usersFetching}
                    usersPayload={this.props.usersPayload}
                    usersFailed={this.props.usersFailed}
                    sendMessage={this.props.sendMessage}
                    messageArray={this.props.messageArray}
                    onlineList={this.props.onlineList}
                    fetchMessages={this.props.fetchMessages}
                    messagesAreFetching={this.props.messagesAreFetching}
                    messagesFetchingError={this.props.messagesFetchingError}
                    messages={this.props.messages}
                />
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

// Retrieve data from store as props
function mapStateToProps(store) {
    return {
        intl: store.intl,
        user: store.user,
        currentChatUser: store.app.currentChatUser,
        usersFetching: store.user.usersFetching,
        usersPayload: store.user.usersPayload,
        usersFailed: store.user.usersFailed,
        notifyMessage: store.chat.notifyMessage,
        messageArray: store.chat.messageArray,
        onlineList: store.chat.onlineList,
        messages: store.chat.messages,
        messagesAreFetching: store.chat.messagesAreFetching,
        messagesFetchingError: store.chat.messagesFetchingError,
        messages: store.chat.messages
    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrentChatUser: (user) => dispatch(updateCurrentChatUser(user)),
        fetchUsers: () => dispatch(fetchUsers()),
        authUser: () => dispatch(authUser()),
        logoutUser: () => dispatch(logoutUser()),
        switchLanguage: (lang) => dispatch(switchLanguage(lang)),
        testChat: () => dispatch(({ type: 'server/send_message', message: 'Hello there. This is a messäge.', receivers: ['123'] })),
        sendMessage: (message, receivers) => dispatch(sendMessage(message, receivers)),
        fetchMessages: (userCuid) => dispatch(fetchMessages(userCuid))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
