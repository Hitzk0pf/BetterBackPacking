import React, {Component, PropTypes} from 'react';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl';
import PreviousIcon from 'grommet/components/icons/base/Previous';
import ClientConversation from "./ClientConversation";
import CloseIcon from 'grommet/components/icons/base/Close';
import ChatIcon from 'grommet/components/icons/base/Chat';
import Button from 'grommet/components/Button';
import TextInput from 'grommet/components/TextInput';
import CaretNextIcon from 'grommet/components/icons/base/CaretNext';
import ClientList from "./ClientList";

export class ChatButton extends Component {

    leaveChat = () => {
        this.props.updateCurrentChatUser(null);
    };

    render() {

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
        />;

        const currentChatUser = this.props.currentChatUser;

        let chatInputSection = "";

        if (currentChatUser !== null) {

            let lastSeen = currentChatUser.last_seen;
            let lastSeenFormatted = new Date(lastSeen);
            let lastSeenChat = "zuletzt gesehen am " + lastSeenFormatted.getDate() + "." + lastSeenFormatted.getMonth() + "." + lastSeenFormatted.getDay();

            if (lastSeenFormatted.getTime() === 0)
                lastSeenChat = "online";

            header = currentChatUser.firstname + " " + currentChatUser.lastname;
            subheader = lastSeenChat;
            prev = (<PreviousIcon style={{stroke: "#fff", marginRight: "0.5rem", cursor: "pointer"}}
                                  onClick={this.leaveChat}/>);

            chatInputSection = (
                <div style={this.props.styles.footer.inputWrap}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <TextInput id='chatInput'
                                   name='chatInput'
                                   placeHolder="Schreibe eine Nachricht..."
                                   style={{marginRight: "0.5rem"}}
                        />
                        <CaretNextIcon size={"medium"} style={{cursor: "pointer"}} />
                    </div>
                </div>
            );

            content = <ClientConversation />;
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
                        margin: "0"
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
