import 'firebase/firestore';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAthHqC7uh9887sSJN9nma_rBnm3IYw-tk",
  authDomain: "bqlab-772a7.firebaseapp.com",
  databaseURL: "https://bqlab-772a7.firebaseio.com",
  projectId: "bqlab-772a7",
  storageBucket: "bqlab-772a7.appspot.com",
  messagingSenderId: "984560384641",
  appId: "1:984560384641:web:c3e6801a770bf50134ab80",
  measurementId: "G-0974MYSKL3"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;

