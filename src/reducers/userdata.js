export default function userdata(state = [], action) {
 switch(action.type){
  case "FETCH_ALL_USERS":
    return action.user;
  case "CHILD_REMOVED":
    return state.filter(userdata => userdata.key !== action.userdata.key)
  case "TOGGLE_ADMIN":
    return state.map(userdata => {
      return userdata.key === action.userdata.key
        ? Object.assign({}, action.userdata, { isAdmin: action.todo.isAdmin })
        : userdata
    })
  default:
    return state;
 }
}
