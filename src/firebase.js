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


export default firebase;
