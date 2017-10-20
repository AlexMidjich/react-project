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

  console.log(this.props.userdata);
  const userList = this.props.userdata.map((userData) => {
   return(
    <div key={userData.key} className="userlistWrapper">
     <p className="users">{userData.email}</p>
     {userData.isAdmin ?
     <button className="isAdmin" onClick={(e) => this.toggleAdmin(userData)}> <i className="fa fa-user-o" aria-hidden="true"></i> </button>
     :
     <button className="notAdmin" onClick={(e) => this.toggleAdmin(userData)}> <i className="fa fa-user-o" aria-hidden="true"></i> </button>
     }
     <button onClick={() => this.remove(userData)} className="btn-remove-user"><i className="fa fa-times" aria-hidden="true"></i></button>
    </div>
   )
 });
  return(
   <section>
    <div className="logged_in_header">
     <h2>Du är inloggad som: </h2> <p> {this.props.user && this.props.user.email}</p>
     <button
         onClick={this.onSignOut}
         className="btn-log-out"
     ><i className="fa fa-sign-out" aria-hidden="true"></i>
     </button>
    </div>
    <p>Bokcirkeln är för dig som vill ha tips på böcker att läsa. Till varje bok kommer du kunna skriva kommentarer och på så sätt diskutera med andra om vad de tyckte om boken.</p>
    <div className="menufield">
     <h3>Böcker jag gillar</h3>
    </div>
    {this.props.value}
    <div>
     {this.props.user.isAdmin === true ?
     <div>
      <h2>Adminpanelen</h2>
      <p>I adminpanelen kan du ta bort andra användare. Du kan även ge eller ta bort andra användare adminstatus.</p>
      <div className="adminList">
       <i className="fa fa-user-o isAdmin" aria-hidden="true"> = Är admin </i>
       <i className="fa fa-user-o notAdmin" aria-hidden="true"> = Är inte admin</i>
       <i className="fa fa-times btn-remove-user" aria-hidden="true"> = ta bort medlem </i>
      </div>
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
