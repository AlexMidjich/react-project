import React, { Component } from 'react';
import Header from './Header';
import Home from './Home';
import Home_loggedin from './Home_loggedin'
import '../styles/App.css';

class App extends Component {
  constructor() {
   super();
   this.state = {
    logged_in: false,
    userName: '',
    password: ''
   };
 }

//Method for changing login status
 onChangeStatus(newStatus){
  this.setState({
   logged_in: newStatus,
  });
 };

//Method for getting the user inputed username
 onHandleUser(e){
  this.setState({
   userName: e.target.value
  });
 }

 //Method for getting the password the user inputed
 onHandlePassword(e){
  this.setState({
   password: e.target.value
  });
 }

  render() {
    return (
      <div>
        <Header />
        {this.state.logged_in /*&& this.state.password === 'password'*/  ?
        <Home_loggedin
         changeStatus={this.onChangeStatus.bind(this)}
         user={this.state.userName}
        />
        :
        <Home
         changeStatus={this.onChangeStatus.bind(this)}
         handleChange={this.onHandleUser.bind(this)}
         handlePassword={this.onHandlePassword.bind(this)}
        />
        }
      </div>
    );
  }
}

export default App;
