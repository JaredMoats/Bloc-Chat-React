import React, { Component } from 'react';
import User from './User';
import '../css/RoomList.css';

class RoomList extends Component {
  constructor(props){
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ''
    };

    /* Object to interact with data in our database. */
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  /*
    Sets this.state.rooms to the rooms already
    in the database.
    Executed when component is rendered.
  */
  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;

      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  /*
     Using state as the source of truth
     for the value of input.
     Update the state based on
     what the user enters into
     the input.
  */
  handleChange(event) {
    this.setState({ newRoomName: event.target.value });
  }

  /*
     Creates a new room and adds
     it to the Firebase database.
     Called by the form below.
  */
  createRoom(event) {
    /* Prevent page refresh upon submission */
    event.preventDefault();
    /* Push the value in newRoomName to the firebase database */
    const newRoom = this.state.newRoomName;
    this.roomsRef.push({
      name: newRoom
    });
    /* set this.state.newRoomName to an empty string */
    const emptyString = '';
    this.setState({ newRoomName: emptyString });
  }

  render() {
    return(
      <nav className="container">
        <h1>Bloc Chat</h1>
        {
          /*
            Display the available Rooms on the page.
            The first parameter is an object. Second is its index.
          */
          this.state.rooms.map((room, index) =>
            <a
              key={ room.key }
              onClick={ /* The user can select the active room. They will only see
                          messages from the room they selected */
                      (key, name) => this.props.setActiveRoom(room.key, room.name)
                      }
              href="#"
            >
              <h3>{ room.name }</h3>
            </a>
          )
        }
        { /* This form creates a new room. */ }
        <form className="newRoomForm" onSubmit={ (event) => this.createRoom(event) }>
          <label>
            Create a New Room:
          </label>
          <input
            type="text"
            value={ this.state.newRoomName }
            onChange={ (event) => this.handleChange(event) }
          />
          <input type="submit" value="Create Room" />
        </form>
      </nav>
    );
  }
}

export default RoomList;
