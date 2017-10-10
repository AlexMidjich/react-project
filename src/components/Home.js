import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/home.css';

class Home extends Component {
 constructor(props){
  super();
  this.state = {
   newStatus: true,
  };
 }

//This method gives the state "logged_in" the status of true, meaning you will be logged in.
 onChangeLogIn(){
  this.props.changeStatus(this.state.newStatus);
 }


 render() {
  return(
   <div className="content">
    <div className="home">
     <h2>Välkommen till Bokcirkeln</h2>
     <p>Bokcirkeln är för dig som vill ha tips på bra läsning och som vill diskutera böcker med andra.</p>
     <p>Logga in för att komma igång med din bokcirkel.</p>
     <form className="login-form">
      <input
       type="text"
       name="user"
       placeholder="Namn"
       onChange={this.props.handleChange}
       value={this.props.userName}
      />
      <input
       type="password"
       name="password"
       placeholder="lösenord"
       value={this.props.password}
       onChange={this.props.handlePassword}
      />
      <button onClick={this.onChangeLogIn.bind(this)} className="btn-log-in">Logga in <i class="fa fa-sign-in" aria-hidden="true"></i></button>
     </form>
    </div>
   </div>
  )
 }
}

export default Home
