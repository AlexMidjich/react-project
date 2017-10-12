
export default function comments(state = [], action) {
 switch(action.type) {
  case "ADD_COMMENT":
   return [...state, action.payload];
  case "REMOVE_COMMENT":
   return state.filter(comment => comment.id !== action.payload.id)
  default:
   return state;
 }


}
