import React, { Component } from 'react';
import '../RoomList.css';

class RoomList extends Component {
  constructor(props){
    super(props);

    this.state = {
      rooms: []
    };

    /* Object to interact with data in our database. */
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;

      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  render() {
    return(
      <nav className="container">
        <h1>Bloc Chat</h1>
        {
          /* The first parameter is an object. Second is its index */
          this.state.rooms.map((room, index) =>
            <div key={ index }><h3>{ room.name }</h3></div>
          )
        }
      </nav>
    );
  }
}

export default RoomList;
