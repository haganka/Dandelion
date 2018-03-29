import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyBzm1rfvBps3JG_u_zEuK9mnjn4Y-l-UZY",
    authDomain: "wish-grant.firebaseapp.com",
    databaseURL: "https://wish-grant.firebaseio.com",
    projectId: "wish-grant",
    storageBucket: "wish-grant.appspot.com",
    messagingSenderId: "329160988075"
  };
  var fire = firebase.initializeApp(config);

  export default fire;
  export const auth = fire.auth();