import Firebase from 'firebase'
import {firebaseConfig} from './config'

const FirebaseApp = Firebase.initializeApp(firebaseConfig)

export default FirebaseApp;
