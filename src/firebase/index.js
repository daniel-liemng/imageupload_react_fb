import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyChXsUW8fe2zWhWgbCCP9srr-ARNxwNYKQ",
  authDomain: "fileupload-react.firebaseapp.com",
  databaseURL: "https://fileupload-react.firebaseio.com",
  projectId: "fileupload-react",
  storageBucket: "fileupload-react.appspot.com",
  messagingSenderId: "519840407524",
  appId: "1:519840407524:web:4e7abe4b9d3016794171f1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
