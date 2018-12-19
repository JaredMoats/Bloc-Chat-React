import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
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
      user: ''
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
    console.log(`setUser() triggered`);

      this.setState({ user: user });
  }

  render() {
    return (
      <div className="App">
        <RoomList
          firebase={ firebase }
          activeRoom={ this.state.activeRoom }
          setActiveRoom={ (key, name) => this.setActiveRoom(key, name) }
          user={ this.state.user }
          setUser={ (user) => this.setUser(user) }
        />
        <MessageList
          firebase={ firebase }
          activeRoom={ this.state.activeRoom }
          activeRoomName={ this.state.activeRoomName }
          user={ this.state.user }
        />
      </div>
    );
  }
}

export default App;
