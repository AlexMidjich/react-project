import React, { Component } from 'react';
import firebase from '../firebase'
import '../styles/App.css';
import '../styles/home.css';
import '../styles/homeLoggedIn.css';

class HomeLoggedIn extends Component {
 constructor(props){
  super();
  this.state = {
   user: props.user,
   comment: '',
   comments: [],
   books: []
  };
  //Binding my methods to the contstructor
  this.onSignOut = this.onSignOut.bind(this);
  this.handleComment = this.handleComment.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
 }

 onSignOut(){ //Method that signs out the user.
  firebase.auth().signOut()
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
   userID: this.state.email
  }
  commentsRef.push(item);
  this.setState({ //This clears the commentfields but keep track on the user
   comment: '',
   email: this.state.email
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

fetchFromApi = () => {
 fetch('https://www.googleapis.com/books/v1/volumes?q=the+fires+of+heaven')
  .then(response => response.json())
  .then(data => {
   //console.log(data);
   this.setState({books: data.items})
  })
 }

 render() {
  //Looping/maping through data from the api that I stored in the state 'books'
  const bookList = this.state.books.map((book) => {
   return (
    <div className="bookField">
     <ul className="books">
      <li key={book.id}>
       <h4>Title: </h4>
        <p>{book.volumeInfo.title}</p>
       <h4>Author: </h4>
        <p>{book.volumeInfo.authors}</p>
       <img src="http://books.google.com/books/content?id=xgFZ63O2gdUC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api" alt="book cover"/>
      </li>
     </ul>
    </div>
   )
  })
  //Looping/maping through comments that is stored in the state 'comments'
  const commentList = this.state.comments.map((item) => {
   return(
    <ul className="comments">
     <li key={item.id} className="commentsList">
      <div className="comment-txt">
       <p><strong>{item.userID}:</strong> {item.text}</p>
      </div>
      <div className="comment-btnfield">
       <button onClick={() => this.removeItem(item.id)} className="btn-remove"><i className="fa fa-times" aria-hidden="true"></i></button>
      </div>
     </li>
    </ul>
   )
  })
  return(
   <div className="content">
    <div className="home">
     <div className="logged_in_header">
      <h2>Du är inloggad som: {this.state.user}</h2>
      <button
          onClick={this.onSignOut.bind(this)}
          className="btn-log-out"
      ><i className="fa fa-sign-out" aria-hidden="true"></i>
      </button>
     </div>
     <section className="display-book">
      {bookList[0]}
     </section>
     <section className='display-comment'>
      {commentList}
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
     <button onClick={this.fetchFromApi} > API </button>
    </div>
   </div>
  )
 }
}

export default HomeLoggedIn;
