import React, { Component } from 'react';

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

      console.log(`From compoentnDidMount in MessageList: message.key is: ${message.key}`);

      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  displayRoomMessage(message, index) {
    if(message.roomId === this.props.activeRoom) {
      return(
        <p key={ index }>{ message.content }</p>
      );
    } else{
      return
    }
  }

  render() {
    return(
      <div>
        {
          this.state.messages.map((message, index) =>
            /*<p key={ message.roomId }>{ message.content }</p>*/
            this.displayRoomMessage(message, index)
          )
        }
      </div>
    );
  }
}

export default MessageList;
