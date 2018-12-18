import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import './css/App.css';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyB7hPccuA7bKjOPs7cAVFfygxqljzyuLVw",
  authDomain: "bloc-chat-react-jared-moats.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-jared-moats.firebaseio.com",
  projectId: "bloc-chat-react-jared-moats",
  storageBucket: "bloc-chat-react-jared-moats.appspot.com",
  messagingSenderId: "292208506294"
};
firebase.initializeApp(config);

class App extends Component {
  constructor() {
    super();

    this.state = {
      activeRoom: '',
      activeRoomName: '',
      userName: ''
    };
  } //end of constructor

  /*
    Sets the new active room based on which room the user clicks.
    Passed as propr to RoomList.
  */
  setActiveRoom(key, name) {
    const newActiveRoom = key;
    const newActiveRoomName = name;

    this.setState({ activeRoom: newActiveRoom, activeRoomName: newActiveRoomName });
  }

  setUser(user) {
    console.log(`${user}`);
  }

  render() {
    return (
      <div className="App">
        <RoomList
          firebase={ firebase }
          activeRoom={ this.state.activeRoom }
          setActiveRoom={ (key, name) => this.setActiveRoom(key, name) }
          setUser={ (user) => this.setUser(user) }
        />
        <MessageList
          firebase={ firebase }
          activeRoom={ this.state.activeRoom }
          activeRoomName={ this.state.activeRoomName }
        />
      </div>
    );
  }
}

export default App;
