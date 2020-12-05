import * as firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyCuv3NJ8aVbpKK_yZUqlNYuUmSyZXWT_SA",
  authDomain: "wily-a399a.firebaseapp.com",
  databaseURL: "https://wily-a399a.firebaseio.com",
  projectId: "wily-a399a",
  storageBucket: "wily-a399a.appspot.com",
  messagingSenderId: "397596387801",
  appId: "1:397596387801:web:89e70cffa8de7dee2411c8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
