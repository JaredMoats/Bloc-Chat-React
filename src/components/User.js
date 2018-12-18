import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
  } //end of constructor

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      const userName = user.displayName;
      this.props.setUser(user, userName);
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  render() {
    return(
      <div>
        <h3>Active user: { this.props.userName }</h3>
        <button onClick={ () => this.signIn() }>Sign In</button>
        <button onClick={ () => this.signOut() }>Sign Out</button>
      </div>
    );
  }
} //end of class

export default User;
