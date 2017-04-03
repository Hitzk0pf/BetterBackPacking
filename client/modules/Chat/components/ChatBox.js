import React, {Component, PropTypes} from 'react';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl';
import PreviousIcon from 'grommet/components/icons/base/Previous';
import ClientConversation from "./ClientConversation";
import CloseIcon from 'grommet/components/icons/base/Close';
import ChatIcon from 'grommet/components/icons/base/Chat';
import Button from 'grommet/components/Button';
import TextInput from 'grommet/components/TextInput';
import FormField from 'grommet/components/FormField';
import Form from 'grommet/components/Form';
import CaretNextIcon from 'grommet/components/icons/base/CaretNext';
import ClientList from "./ClientList";

export class ChatButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chatInput: '',
            wentOffline: [],
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.onlineList !== this.props.onlineList) {
            const wentOffline = this.props.onlineList.filter(onlineUser => newProps.onlineList.indexOf(onlineUser) === -1)
            const currDate = new Date();

            wentOffline.map(offlineUser => this.setState({
                wentOffline: this.state.wentOffline.concat([{
                    user: offlineUser,
                    date: currDate
                }])
            }));
        }
    }

    leaveChat = () => {
        this.props.updateCurrentChatUser(null);
    };

    calculateLastSeen(currentChatUser, onlineList, wentOffline) {
        // calculate lastSeen
        if (onlineList.indexOf(currentChatUser.cuid) !== -1) {
            return "online";
        }

        let lastSeen = currentChatUser.last_seen;
        let lastSeenFormatted = new Date(lastSeen);
        // if the user isn't in the onlineList, check if he was before to display current date:
        const offlineUser = wentOffline.filter(user => user.user === currentChatUser.cuid);
        if (offlineUser.length > 0) {
            lastSeenFormatted = offlineUser[0].date;
        }

        let lastSeenChat = "zuletzt gesehen am " + lastSeenFormatted.getDate() + "." + (lastSeenFormatted.getMonth() + 1) + "." + lastSeenFormatted.getDay();
        // call setHours to take the time out of the comparison
        if (new Date(lastSeen).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) {
            // Date equals today's date - print time only
            lastSeenChat = "zuletzt gesehen um " + lastSeenFormatted.getHours() + ":" + lastSeenFormatted.getMinutes();
        }

        // if timestamp is equal to zero, the user is currently online
        if (lastSeenFormatted.getTime() === 0)
            lastSeenChat = "online";

        return lastSeenChat;
    }

    sendMessage() {
        event.preventDefault();
        this.props.sendMessage(this.state.chatInput, [this.props.currentChatUser.cuid])
        this.setState({chatInput: ''});
        // console.log(this.state.chatInput, this.props.currentChatUser)

    }

    handleChange(event) {

        let newState = {};

        if (event.target.type == "checkbox") {
            newState[event.target.name] = event.target.checked;
        } else {
            newState[event.target.name] = event.target.value;
        }

        this.setState(newState);

    }

    render() {

        console.log('chatbox props', this.props)

        this.messages = [];

        let header = "Chat";
        let subheader = "Contacts";
        let prev = "";

        let content = <ClientList
            styles={this.props.clientsStyles}
            updateCurrentChatUser={this.props.updateCurrentChatUser}
            fetchUsers={this.props.fetchUsers}
            usersFetching={this.props.usersFetching}
            usersPayload={this.props.usersPayload}
            usersFailed={this.props.usersFailed}
            calculateLastSeen={this.calculateLastSeen}
            onlineList={this.props.onlineList}
            wentOffline={this.state.wentOffline}
            fetchMessages={this.props.fetchMessages}
        />;


        let chatInputSection = "";

        if (this.props.currentChatUser !== null) {
            header = this.props.currentChatUser.firstname + " " + this.props.currentChatUser.lastname;
            subheader = this.calculateLastSeen(this.props.currentChatUser, this.props.onlineList, this.state.wentOffline);
            prev = (<PreviousIcon style={{stroke: "#fff", marginRight: "0.5rem", cursor: "pointer"}}
                                  onClick={this.leaveChat}/>);

            chatInputSection = (
                <div style={this.props.styles.footer.inputWrap}>
                    <div style={{
                        width: '80%',
                        margin: 'auto',
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Form onSubmit={(event) => {
                            event.preventDefault();
                            this.sendMessage();
                        }}>
                            <FormField>
                                <TextInput id='chatInput'
                                           name='chatInput'
                                           placeHolder="Schreibe eine Nachricht..."
                                           value={this.state.chatInput}
                                           onDOMChange={(event) => this.handleChange(event)}
                                           style={{marginRight: "0.5rem"}}
                                />
                            </FormField>
                        </Form>
                        <CaretNextIcon size={"medium"} style={{cursor: "pointer"}} onClick={() => this.sendMessage()}/>
                    </div>
                </div>
            );


            content =
                <ClientConversation
                    user={this.props.currentChatUser}
                    fetchMessages={this.props.fetchMessages}
                    messageArray={this.props.messageArray}
                    messagesAreFetching={this.props.messagesAreFetching}
                    messagesFetchingError={this.props.messagesFetchingError}
                    messages={this.props.messages}
                />;
        }

        let heading = (
            <div style={this.props.styles.header}>
                <div style={{display: "flex", alignItems: "center"}}>
                    {prev}
                    <div>
                        <h2 style={{color: "#fff", fontSize: "1.1rem", margin: "0"}}>{header}</h2>
                        <h3 style={{
                            color: "#fff",
                            fontSize: "0.9rem",
                            fontWeight: "400",
                            lineHeight: "0.5rem",
                            margin: "0",
                        }}>{subheader}</h3>
                    </div>
                </div>

            </div>
        );


        return (
            <div style={this.props.styles.wrapper}>

                {heading}

                <div style={this.props.styles.content}>
                    <div style={{
                        width: "100%",
                        margin: "auto"
                    }}>
                        {content}
                    </div>
                </div>

                {chatInputSection}

                {/*

                 <div style={this.props.styles.footer.newConversationWrap}>

                 <Button label='New Conversation'
                 href='#'
                 primary={true}
                 accent={false}
                 secondary={false}
                 plain={false}
                 />

                 </div>

                 */}

            </div>
        );
    }
}

export default ChatButton;
