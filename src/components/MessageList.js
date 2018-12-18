import React, { Component } from 'react';
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
        <li key={ index } className="message"><p>{ message.content }</p></li>
      );
    } else {
      return
    }
  }

  render() {
    return(
      <div className="messages">
        <h1>{ this.props.activeRoomName }</h1>
        {
          this.state.messages.map((message, index) =>
            this.displayRoomMessage(message, index)
          )
        }
      </div>
    );
  }
}

export default MessageList;
