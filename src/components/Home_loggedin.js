import React, { Component } from 'react';
import firebase from '../firebase'
import '../styles/App.css';
import '../styles/home.css';
import '../styles/home_loggedin.css';

class Home_loggedin extends Component {
 constructor(props){
  super();
  this.state = {
   newStatus: false,
   userName: props.user,
   comment: '',
   comments: []
  };
  //Binding my methods to the contstructor
  this.onChangeLogOut = this.onChangeLogOut.bind(this);
  this.handleComment = this.handleComment.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
 }

 onChangeLogOut(){ //Method that changes the logged in status to false and redirects the user to Home component instead.
  this.props.changeStatus(this.state.newStatus);
 }

 handleComment(e) { //Method for storing the user inputed data from the textarea field in to my state
  this.setState({
   [e.target.name]: e.target.value
  });
 }
 handleSubmit(e) {//Method for storing data from the app to my database when the user press 'Lägg till kommentar'
  e.preventDefault();
  const commentsRef = firebase.database().ref('comments'); //Call the 'ref' method to store the comment in firebase
  const item = {
   text: this.state.comment,
   userID: this.state.userName
  }
  commentsRef.push(item);
  this.setState({ //This clears the commentfields but keep track on the user
   comment: '',
   userName: this.state.userName
  });
 }

 componentDidMount(){
  const commentsRef = firebase.database().ref('comments');
  commentsRef.on('value', (snapshot) => {
   let comments = snapshot.val();
   let newState = [];
   for(let item in comments) {
    newState.push({
     id: item,
     text: comments[item].text,
     userID: comments[item].userID
    });
   }
   this.setState({
    comments: newState
   });
  });
 }
 removeItem(itemID){
  const commentsRef = firebase.database().ref(`/comments/${itemID}`);
  commentsRef.remove();
 }

 render() {
  return(
   <div className="content">
    <div className="home">
     <div className="logged_in_header">
      <h2>Välkommen {this.state.userName}</h2>
      <button
          onClick={this.onChangeLogOut.bind(this)}
          className="btn-log-out"
      ><i class="fa fa-sign-out" aria-hidden="true"></i>
      </button>
     </div>
     <section className='display-comment'>
      <ul>
       {this.state.comments.map((item) => {
        return(
         <li key={item.id}>
          <div className="comment-txt">
           <p><strong>{item.userID}:</strong> {item.text}</p>
          </div>
          <div className="comment-btnfield">
           <button onClick={() => this.removeItem(item.id)} className="btn-remove"><i class="fa fa-times" aria-hidden="true"></i></button>
          </div>
         </li>
        )
       })}
      </ul>
     </section>
     <div className="comment-field">
      <form onSubmit={this.handleSubmit}>
       <input
        type="text"
        name="comment"
        placeholder="Skriv en kommentar"
        onChange={this.handleComment} value={this.state.comment}
       />
       <button className="btn-add-comment">Lägg till kommentar</button>
      </form>
     </div>
     <hr />
    </div>
   </div>
  )
 }
}

export default Home_loggedin;
