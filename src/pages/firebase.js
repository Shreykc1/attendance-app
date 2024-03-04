import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyA0KZO1treRntdTgmD5ux1MBs0HVBvnf0w",
  authDomain: "attendance-2162f.firebaseapp.com",
  databaseURL: "https://attendance-2162f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "attendance-2162f",
  storageBucket: "attendance-2162f.appspot.com",
  messagingSenderId: "485321040291",
  appId: "1:485321040291:web:51322eb2665ac89a63fa16",
  measurementId: "G-XWT2XKTRBS"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();


export default app;


const analytics = getAnalytics(app);
