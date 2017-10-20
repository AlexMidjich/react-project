import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/home.css';

class Home extends Component {

 render() {
  return(
   <div className="content">
    <div className="home">
     <h2>Välkommen till Bokcirkeln</h2>
     <p>Bokcirkeln är för dig som vill ha tips på bra läsning och som vill diskutera böcker med andra.</p>
     <p>Registerar dig med en ny användare eller Logga in för att komma igång med din bokcirkel.</p>
     <div className="sign-in-box">
      <form className="login-form" onSubmit={this.props.register}>
       <strong>{this.props.error}</strong>
       <input
        type="text"
        name="email"
        placeholder="E-post"
        onChange={this.props.handleChange}
        value={this.props.email}
        className="userinputs"
       />
       <input
        type="password"
        name="password"
        placeholder="Lösenord"
        value={this.props.password}
        onChange={this.props.handlePassword}
        className="userinputs"
       />
       <input type="submit" value="Registrera" className="btn-log-in"/>
      </form>
       <button onClick={this.props.signIn} className="btn-log-in">Logga in <i className="fa fa-sign-in" aria-hidden="true"></i></button>
     </div>
    </div>
   </div>
  )
 }
}

export default Home
