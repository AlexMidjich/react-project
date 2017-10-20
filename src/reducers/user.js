
export default function user(state = [], action) {
 switch(action.type){
  case "FETCH_ALL_USERS":
    //Don't need to manipulate the state, just return the whole array of objects!
    return action.user;
  case "SIGN_IN":
   return action.user;
  case "SIGN_OUT":
    return action.user;
  default:
    return state;
 }
}
