
import React, { useState, useEffect } from 'react';
import styles from '../styles/Login.module.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import { Link,Route, Routes,useNavigate } from 'react-router-dom';
import Hero from './Hero';
import { getDatabase } from 'firebase/database';



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
const analytics = getAnalytics(app);
const auth = getAuth();

const db = getDatabase();




function Login() {
  let navigate = useNavigate();
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
          console.log("uid", uid)
        } else {
          // User is signed out
          // ...
          console.log("user is logged out")
        }
      });
     
}, [])

 const loginAuth = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        navigate("/Hero");
        const user = userCredential.user;
        console.log(user);
        alert('Login Successfull!');
        
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
    });




}






 useEffect(() => {
  document.body.style.overflowX = "hidden";
  return () => {
    document.body.style.overflowX = "scroll"
  };
}, []);


 return (
  
  


  <div className={styles.container}>
    {/* <Routes>                                                                     
        <Route path="/Hero" element={<Hero/>}/>
        <Route path="/login" element={<Login/>}/>
    </Routes> */}
     
    
    <div className={styles.titleText}>
        <h1>Login</h1>
      </div>

      <section className={styles.section}>

        <div className={styles.formbox}>
          <div className={styles.formvalue}>
            <form action="" id="login-form" >

              <div className={styles.inputbox}>
                <ion-icon name="mail-outline"></ion-icon>
                <input className={styles.input} name='email' type="email" placeholder=" " autocomplete="off" required onChange={(e)=>setEmail(e.target.value)}/>
                <label htmlFor="">Email</label>
              </div>
              <div className={styles.inputbox}>
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input className={styles.input} name='password' type="password" placeholder=" " autocomplete="off" required  onChange={(e)=>setPassword(e.target.value)}/>
                <label htmlFor="">Password</label>
              </div>
              <button className={styles.button} onClick={loginAuth} type="submit">Submit</button>

              <div id="err"></div>
            </form>
          </div>
        </div>
      </section>

      <Link to='/signup'>
      <div className={styles.dont}>
        don't have an account? <button className={styles.signUp}>Sign Up</button>
      </div>
      </Link>

      

    </div>
   
 );
}

export default Login;
