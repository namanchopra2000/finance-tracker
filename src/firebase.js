// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider} from "firebase/auth";
import { getFirestore ,doc , setDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfdfeh_0OcVn03aiMoVc05EjzzxDL3YZ8",
  authDomain: "financely-b4f78.firebaseapp.com",
  projectId: "financely-b4f78",
  storageBucket: "financely-b4f78.appspot.com",
  messagingSenderId: "379971946894",
  appId: "1:379971946894:web:9fc6d5d9c678f38aa93cdf",
  measurementId: "G-0NTKYC7KMT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db , auth  , provider , doc ,setDoc}