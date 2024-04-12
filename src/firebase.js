import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAeLCz63n0vUkfYrFCZCUIhO2xQkmpTjMg",
  authDomain: "totalentedcenteroflearning.firebaseapp.com",
  projectId: "totalentedcenteroflearning",
  storageBucket: "totalentedcenteroflearning.appspot.com",
  messagingSenderId: "75536259838",
  appId: "1:75536259838:web:4585b9f421c5b6653323af",
  measurementId: "G-M784J9WDMJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getAuth(app)
