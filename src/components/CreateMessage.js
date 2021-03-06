import React, { Component } from 'react';
import '../css/CreateMessage.css';

class CreateMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ''
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
  } // end of constructor

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  sendMessage(event) {
    //Prevent page refresh upon submission
    event.preventDefault();
    //Add message to the messages in the database
    const newMessage = this.state.input;
    let timeStamp = new Date();
    timeStamp = timeStamp.toLocaleTimeString();

      if(this.props.user !== null){
        this.messagesRef.push({
          content: newMessage,
          roomId: this.props.activeRoom,
          username: this.props.user.displayName,
          sentAt: timeStamp
        });
      } else {
        this.messagesRef.push({
          content: newMessage,
          roomId: this.props.activeRoom,
          username: 'Guest',
          sentAt: timeStamp
      });
    }
    const emptyString = '';
    this.setState({ input: emptyString });
  }

  render() {
    return(
      <div className="createMessageField">
        <form onSubmit={ (event) => this.sendMessage(event) }>
          <input
            type="text"
            value={ this.state.input }
            onChange={ (event) => this.handleChange(event) }
            />
            <button>Send</button>
        </form>
      </div>
    );
  }
}

export default CreateMessage;
