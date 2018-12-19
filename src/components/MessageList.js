import React, { Component } from 'react';
import CreateMessage from './CreateMessage';
import '../css/MessageList.css';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    this.messageRef = this.props.firebase.database().ref('messages');
  } //end of constructor

  componentDidMount() {
    this.messageRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;

      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  /*
    Only displays the messages that have a property of roomId
    that matches the chatroom's id.
  */
  displayRoomMessage(message, index) {
    if(message.roomId === this.props.activeRoom) {
      return(
        <li key={ index } className="message">
          <p>{ message.content }</p>
          <p>From: { message.username } at { message.sentAt }</p>
        </li>
      );
    } else {
      return
    }
  }

  render() {
    return(
        <div className="message-container">
          <div className="messages">
            <h1>{ this.props.activeRoomName }</h1>
            {
              this.state.messages.map((message, index) =>
                this.displayRoomMessage(message, index)
              )
            }
          </div>
          <CreateMessage
            firebase={ this.props.firebase }
            activeRoom={ this.props.activeRoom }
            user={ this.props.user }
          />
        </div>
    );
  }
}

export default MessageList;
