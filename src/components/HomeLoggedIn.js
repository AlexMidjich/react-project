import React, { Component } from 'react';
import UserPage from './UserPage'
import firebase from '../firebase'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/action';
import '../styles/App.css';
import '../styles/home.css';
import '../styles/homeLoggedIn.css';

class HomeLoggedIn extends Component {
 state ={
   value: "",
   books: [],
   toggleComments: true,
   toggleLike: true,
 }

 componentDidMount(){
  this.props.fetchComments();
  this.props.fetchBooks();
  // this.props.addBookListener();
  // this.props.removeBookListener();

  fetch('https://www.googleapis.com/books/v1/volumes?q=dawn+of+the+jedi')
   .then(response => response.json())
   .then(data => {
    this.setState({books: data.items})
   })
  }
  //Method that signs out the user.
   onSignOut(){
    firebase.auth().signOut()
   }

 onToggleComment = () => {
  this.setState({ toggleComments: !this.state.toggleComments })
  console.log(this.state.toggleComments);
 };

 like = () => {
  this.props.addBook({
   LikeBook: this.state.books[0].volumeInfo.title,
   userID: this.props.user.email
  })
  this.setState({ toggleLike: !this.state.toggleLike })
 }
 dislike(userBook) {
   this.props.removeBook(userBook);
   this.setState({ toggleLike: !this.state.toggleLike })
 }

//Function that ads the users comment to the database together with the users email.
 add = (e) => {
  e.preventDefault();
  this.props.addComment({
    text: this.state.value,
    userID: this.props.user.email
  })
  this.setState({value: ''});
 }

 remove = (comment) => {
   this.props.removeComment(comment);
 }

 onChange = e => this.setState({ [e.target.name]: e.target.value})

 render() {
  //Looping/maping through data from the api that I stored in the state 'books'
  const bookList = this.state.books.map((book) => {
   return (
    <div className="bookField">
     <ul className="books">
      <li key={book.id}>
       <img src="http://books.google.com/books/content?id=bQkRoWzH3aUC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api" alt="book cover"/>
       <div className="book-info">
        <div className="data">
          <p><strong>Titel:</strong> {book.volumeInfo.title}</p>
        </div>
        <div className="data">
          <p><strong>Skriven av:</strong> {book.volumeInfo.authors}</p>
        </div>
       </div>
      </li>
     </ul>
    </div>
   )
  })
  const favoriteList = this.props.userBooks.map(userBook =>
   userBook.userID === this.props.user.email ?
    <div key={userBook.key} className="likedbooks">
      <button className="btn-round-like" onClick={() => this.dislike(userBook)}><i className="fa fa-heart" aria-hidden="true"></i></button>
      <p>{userBook.LikeBook}</p>
    </div>
    :
    null
  );
  // This prints out the like button for the books.
  const likebtn = this.state.toggleLike ?
   <button className="btn-round" onClick= { this.like }><i className="fa fa-heart" aria-hidden="true"></i></button>
  :
   null

  return(
   <section className="content">
    <section className="home">
     <section className="display-book">
      <h2>Periodens bok</h2>
      {bookList[0]}
      <div className="menufield">
       {likebtn}
       <button className="btn-round" onClick={ this.onToggleComment }><i className="fa fa-comment" aria-hidden="true"></i></button>
      </div>
     </section>
     <section className='display-comment'>
     {this.state.toggleComments ?
        null
        :
        this.props.comments.map(comment =>
          <div key={comment.key} className="commentsList">
           <div className="comment-txt">
             <p><strong>{comment.userID}:</strong> {comment.text}</p>
            </div>
            <div className="comment-btnfield">
             {comment.userID === this.props.user.email || this.props.user.isAdmin ? //A ternary that checks if the user that posted the comments is the same as the one thats logged in, if so the user can remove his item.
             <button onClick={() => this.remove(comment)} className="btn-remove"><i className="fa fa-times" aria-hidden="true"></i></button> : null}
            </div>
           </div>
         )}
        {this.state.toggleComments ?
        null
        :
        <div className="comment-field">
         <form onSubmit={this.handleSubmit}>
          <input
           type="text"
           name="value"
           placeholder="Skriv en kommentar"
           onChange={this.onChange}
           value={this.state.value}
          />
          <button className="btn-add-comment" onClick={this.add}>Lägg till kommentar</button>
         </form>
        </div>}
     </section>
    </section>
    <section className="profilespace">
     <UserPage value={favoriteList}/>
    </section>
   </section>
  )
 }
}

function mapDispatchToProps(dispatch){
 return bindActionCreators(actions, dispatch)
}

const mapStateToProps = state =>{
 return {
   comments: state.comments,
   userBooks: state.userBooks,
   user: state.user,
   error: state.error
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeLoggedIn);
