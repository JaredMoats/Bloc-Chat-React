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
    this.props.firebase.auth().signInWithPopup(provider).then(result => {
      //The signed-in user info
      const user = result.user;
      const userName = user.displayName;

      //this.props.setUser(user, userName);
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

    /*this.props.firebase.auth().signInWithRedirect(provider);
    this.props.firebase.auth().getRedirectResult().then(result => {
      if(result.credential) {
        const token = result.credential.accessToken;
      }
      const user = result.user;
      const userName = user.displayName;
    }).catch(error => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
      const email = error.email;
      console.log(email);
      const credential = error.credential;
      console.log(credential);
    });*/
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
