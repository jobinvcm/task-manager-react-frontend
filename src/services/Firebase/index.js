import Firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBmYgeyZTxDggJDoOkUE5Gt0Stt4_y6A8k",
  authDomain: "nucleustechnology-b578d.firebaseapp.com",
  databaseURL: "https://nucleustechnology-b578d.firebaseio.com",
  projectId: "nucleustechnology-b578d",
  storageBucket: "nucleustechnology-b578d.appspot.com",
  messagingSenderId: "48415133460",
  appId: "1:48415133460:web:40e3afe955003342"
};

const FirebaseApp = Firebase.initializeApp(firebaseConfig)

export default FirebaseApp;
