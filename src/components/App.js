import React, { Component } from 'react';
import Header from './Header';
import Home from './Home';
import HomeLoggedIn from './HomeLoggedIn'
import firebase from '../firebase';
import '../styles/App.css';

class App extends Component {
  constructor() {
   super();
   this.state = {
    email: '',
    password: '',
    user: '',
    error: ''
   };
 }

 componentDidMount() {
  firebase.auth().onAuthStateChanged(user => {
   if(user){
    this.setState({user: user});
   }else{
    this.setState({user: ''});
   }
  })
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
   .createUserWithEmailAndPassword(this.state.email, this.state.password);
   console.log('Register');
 }

  render() {
    return (
      <div>
        <Header />
        {this.state.user ?
        <HomeLoggedIn
         user={this.state.user && this.state.user.email }
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

export default App;
