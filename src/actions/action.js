
export function addComment(comment) {
 return {
  type: "ADD_COMENT",
  payload: comment
 }
}

export function removeComment(comment) {
 return {
  type: "REMOVE_COMMENT",
  payload: comment
 }
}
