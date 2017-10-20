import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBESC2-KCkCPWfbvAQr7I3W3cfC_7yjwW0",
  authDomain: "bokcirkeln-cafef.firebaseapp.com",
  databaseURL: "https://bokcirkeln-cafef.firebaseio.com",
  projectId: "bokcirkeln-cafef",
  storageBucket: "",
  messagingSenderId: "692099823981"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
