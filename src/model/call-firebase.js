// Initialize Firebase
var config = {
  apiKey: "AIzaSyCewaF69yg8E-nNNgklppFXA63SCUp_76s",
  authDomain: "reservationtv-951e1.firebaseapp.com",
  databaseURL: "https://reservationtv-951e1.firebaseio.com",
  projectId: "reservationtv-951e1",
  storageBucket: "reservationtv-951e1.appspot.com",
  messagingSenderId: "640610793868"
};
firebase.initializeApp(config);
window.database = firebase.database();