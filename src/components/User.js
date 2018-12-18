import React, { Component } from 'react';
import '../css/User.css';

class User extends Component {
  constructor(props) {
    super(props);
  } //end of constructor

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      console.log(`From componentDidMount in User.js: The value of user is: ${user}`);
      this.props.setUser(user);
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
    /*this.props.firebase.auth().getRedirectResult().then(result => {
      const user = result.user;
      this.props.setUser(user);
    });*/
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  displayGuest(user) {
    if(user === null){
      return(
        <h3>Hi, Guest!</h3>
      );
    } else {
      return(
        <h3>Hi, { user.displayName }!</h3>
      );
    }
  }

  render() {
    return(
      <div className="userNameContainer">
        <h3>{ this.displayGuest(this.props.user) }</h3>
        <button onClick={ () => this.signIn() }>Sign In</button>
        <button onClick={ () => this.signOut() }>Sign Out</button>
      </div>
    );
  }
} //end of class

export default User;
