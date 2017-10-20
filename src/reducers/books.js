export default function userBooks(state = [], action) {
 switch(action.type){
  case "FETCH_ALL_BOOKS":
    //Don't need to manipulate the state, just return the whole array of objects!
    return action.userBooks;
  case "CHILD_ADDED":
    return [...state, action.userBooks];
  case "CHILD_REMOVED":
    return state.filter(userBook => userBook.key !== action.userBook.key)
  default:
    return state;
 }
}
