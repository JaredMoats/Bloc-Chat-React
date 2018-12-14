import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import './App.css';

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
      activeRoom: ''
    };
  } //end of constructor

  setActiveRoom(key) {
    const newActiveRoom = key;

    console.log(`From setActiveRoom(key) in App.js: the value of newActiveRoom is: ${newActiveRoom}`);

    //this.setState({ activeRoom: newActiveRoom }); 
  }

  render() {
    return (
      <div className="App">
        <RoomList
          firebase={ firebase }
          activeRoom={ this.state.activeRoom }
          setActiveRoom={ (key) => this.setActiveRoom(key) }
        />
        <MessageList
          firebase={ firebase }
          activeRoom={ this.state.activeRoom }
        />
      </div>
    );
  }
}

export default App;
