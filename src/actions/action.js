
import firebase from '../firebase';

//Actions for adding/removing and fetching all user comments from database.

export function addComment(comment){
  return function(dispatch){
    firebase.database().ref(`comments`).push(comment)
    .catch(error => {
      dispatch({type: "FETCH_ERROR", error: error.message});
    })
  }
}

export function removeComment(comment){
  return function (dispatch){
    firebase.database().ref(`comments/${comment.key}`).remove()
  }
}
export function fetchComments(){
  return function(dispatch){
    return firebase.database().ref(`comments`).on('value', comments => {
        let tempList = [];
        comments.forEach(child => {
          tempList.push({...child.val(), key: child.key});
        })
        dispatch({ type: "FETCH_ALL_COMMENTS", comments: tempList });
    })
  }
}

//Actions for adding/removing and fetching all likes from database.

export function addBook(userBook){
  return function(dispatch){
    firebase.database().ref(`userBooks`).push(userBook)
    .catch(error => {
      dispatch({type: "FETCH_ERROR", error: error.message});
    })
  }
}
export function removeBook(userBook){
  return function (dispatch){
    firebase.database().ref(`userBooks/${userBook.key}`).remove()
  }
}

export function addBookListener(){
 return function(dispatch){
  return firebase.database().ref("userBooks")
   .on("child_added", userBook =>{
    const addedBook = {...userBook.val(), key: userBook.key};
    dispatch({ type: "CHILD_ADDED", bookinfo: addedBook})
   })
 }
}
export function removeBookListener(){
 return function(dispatch){
  return firebase.database().ref("userBooks")
   .on("child_removed", userBook =>{
    const removeBook = {...userBook.val(), key: userBook.key};
    dispatch({ type: "CHILD_REMOVED", bookinfo: removeBook})
   })
 }
}
export function fetchBooks(){
  return function(dispatch){
    return firebase.database().ref(`userBooks`).on('value', userBooks => {
        let tempList = [];
        userBooks.forEach(child => {
          tempList.push({...child.val(), key: child.key});
        })
        dispatch({ type: "FETCH_ALL_BOOKS", userBooks: tempList });
    })
  }
}

//Actions for handeling registration of a user and storing user data in the realtime database

export function userChanged(){
 return function(dispatch){
  return firebase.auth().onAuthStateChanged(user => {
   if(user){
    firebase.database().ref(`users/${user.uid}`).once('value')
    .then(user => {
     //console.log(user.val());
     dispatch({ type: "SIGN_IN", user: {...user.val(), key: user.key}});
    })
   }else{
    dispatch({ type: "SIGN_OUT", user: ''})
   }
  })
 }
}

//Managing userdata in adminpanel

export function removeUserdata(userdata){
  return function (dispatch){
    firebase.database().ref(`users/${userdata.key}`).remove()
  }
}
export function toggleAdmin(userdata){
  return function (dispatch){
    firebase.database().ref(`users/${userdata.key}/isAdmin`).set(!userdata.isAdmin)
  }
}

export function fetchUsers(){
  return function(dispatch){
    return firebase.database().ref(`users`).on('value', userdata => {
        let tempList = [];
        userdata.forEach(userdata => {
          tempList.push({...userdata.val(), key: userdata.key});
        })
        dispatch({ type: "FETCH_ALL_USERS", user: tempList });
    })
  }
}
