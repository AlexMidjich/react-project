import React, { Component } from 'react';
import Header from './Header';
import Home from './Home';
import HomeLoggedIn from './HomeLoggedIn'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/action';
import firebase from '../firebase';
import '../styles/App.css';

class App extends Component {
 state = {
    userData: this.props.user,
    email: '',
    password: '',
    error: ''
   }


 componentDidMount() {
  this.props.userChanged();
 }

//Method for changing login status
 onSignIn(newStatus){
  if(this.state.email === ''){
   this.setState({error: 'Du glömde skriva in en e-post adress!'})
  }else{
  firebase.auth()
  .signInWithEmailAndPassword(this.state.email, this.state.password)
  this.setState({error: ''})
 }
 };

//Method for getting the user inputed username
 onHandleUser(e){
  this.setState({
   email: e.target.value
  });
 }

 //Method for getting the password the user inputed
 onHandlePassword(e){
  this.setState({
   password: e.target.value
  });
 }

 onRegister(e){
  e.preventDefault();
  firebase.auth()
   .createUserWithEmailAndPassword(this.state.email, this.state.password)
   .then(user => {
    const newUser = {
     email: user.email,
     isAdmin: false
    }
    firebase.database().ref(`users/${user.uid}`).set(newUser);
   });
   console.log('Register');
 }

  render() {
   //console.log(this.props.user);
    return (
      <div>
        <Header />
        {this.props.user ?
        <HomeLoggedIn
         userInfo={this.state.user && this.state.user.email }
        />
        :
        <Home
         register={this.onRegister.bind(this)}
         signIn={this.onSignIn.bind(this)}
         handleChange={this.onHandleUser.bind(this)}
         handlePassword={this.onHandlePassword.bind(this)}
         error={this.state.error}
        />
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
 return bindActionCreators(actions, dispatch)
}

function mapStateToProps(state){
 return {
   user: state.user
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
