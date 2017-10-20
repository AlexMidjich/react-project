import React, { Component } from 'react';
import firebase from '../firebase'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/action';
import '../styles/homeLoggedIn.css';

class UserPage extends Component {


 componentDidMount() {
  this.props.fetchUsers();
 }
 //Method that signs out the user.
  onSignOut(){
   firebase.auth().signOut()
  }

  remove = (userData) => {
    this.props.removeUserdata(userData);
  }
  toggleAdmin = (userData) => {
   this.props.toggleAdmin(userData);
}
onClick(e) {
 e.preventDefault();
}

 render(){

  console.log(this.props.user);
  const userList = this.props.userdata.map((userData) => {
   return(
    <div key={userData.key} className="userlistWrapper">
     <p>{userData.email}</p>
     <button onClick={() => this.remove(userData)} className="btn-remove-user"><i className="fa fa-times" aria-hidden="true"></i></button>
     <button className="button" onClick={(e) => this.toggleAdmin(userData)}> Admin </button>
    </div>
   )
 });
  return(
   <section>
    <div className="logged_in_header">
     <h2>Du är inloggad som: </h2> <p> {this.props.user && this.props.user.email}</p>
     <button
         onClick={this.onSignOut.bind(this)}
         className="btn-log-out"
     ><i className="fa fa-sign-out" aria-hidden="true"></i>
     </button>
    </div>
    <div className="menufield">
     <h3>Böcker jag gillar</h3>
    </div>
    {this.props.value}
    <div>
     {this.props.user.isAdmin === true ?
     <div>
      <h2>Adminpanelen</h2>
      <h4>Alla användare</h4>
      <ul>
       <li className="userlist">{userList}</li>
      </ul>
     </div>
     :
     null
    }
    </div>
   </section>
  )
 }
}

function mapDispatchToProps(dispatch){
 return bindActionCreators(actions, dispatch)
}

const mapStateToProps = state =>{
 return {
  userBooks: state.userBooks,
  user: state.user,
  userdata: state.userdata
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
