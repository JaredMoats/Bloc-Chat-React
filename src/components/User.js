import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
  } //end of constructor

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }

  signIn() {
    var provider = new this.props.firebase.auth.GoogleAuthProvider();
    /*this.props.firebase.auth().signInWithPopup(provider).then(result => {
      //Gives me a Google Access Token. Use it to access the Google API
      var token = result.credential.accessToken;
      //The signed-in user info
      var user = result.user;
      console.log(`Display name: ${user.displayName}`);
    }).catch(error => {
      var errorCode = error.code;
      console.log(errorCode);
      var errorMessage = error.message;
      console.log(errorMessage);
      var email = error.email;
      console.log(email);
      var credential = error.credential;
      console.log(credential);
    });*/

    this.props.firebase.auth().signInWithRedirect(provider);
    this.props.firebase.auth().getRedirectResult().then(result => {
      if(result.credential) {
        const token = result.credential.accessToken;
      }
      const user = result.user;
      console.log(`User's email: ${user.email}`);
    }).catch(error => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
      const email = error.email;
      console.log(email);
      const credential = error.credential;
      console.log(credential);
    });
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  render() {
    return(
      <div>
        <button onClick={ () => this.signIn() }>Sign In</button>
        <button onClick={ () => this.signOut() }>Sign Out</button>
      </div>
    );
  }
} //end of class

export default User;
