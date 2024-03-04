
import React, { useState, useEffect } from 'react';
import styles from '../styles/Login.module.css';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, } from "firebase/database";
import { push,get, onValue,child,update } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import { Link,Route, Routes,useNavigate } from 'react-router-dom';
import Hero from './Hero';



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










function Signup() {
 

  let navigate = useNavigate();
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistered,setIsRegistered] = useState(false);
  let uid = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

  const dbRef = ref(db,'users/');

  



  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log("uid", uid)
        } else {
          console.log("user is logged out")
        }
      });
     
}, [])


 const signupAuth = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed UP
        navigate("/NumberSub");
        const user = userCredential.user;
        console.log(user);


        addEntries(name,email,password);
        alert('Login Successfull!');
        


          // push(dbRef, {
          //       name: name,
          //       email: email,
          //       password: password
          //     }).then(() => {
          //       console.log('Data pushed successfully');
          //     }).catch((error) => {
          //       console.error('Error pushing data:', error);
          //     });
         // setting value
         
      }
       
        // ...
    )
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
    });


}









function addEntries(name,email,password) {
  const db = getDatabase();

  // A post entry.
  const postData = {
    name:name,
    email:email,
    password:password 
  };

  // Get a key for a new Post.
  // const newPostKey = push(child(ref(db), 'users/')).key;
  const updates = {};
  updates['users/' + name] = postData;

  return update(ref(db), updates);
}


 useEffect(() => {
  document.body.style.overflowX = "hidden";
  return () => {
    document.body.style.overflowX = "scroll"
  };
}, []);


 return (
  
  


  <div className={styles.container}>
     
    
    <div className={styles.titleText}>
        <h1>Sign Up</h1>
      </div>

      <section className={styles.section}>

        <div className={styles.formbox}>
          <div className={styles.formvalue}>
            <form action="" id="login-form" >

            <div className={styles.inputbox}>
                <ion-icon name="mail-outline"></ion-icon>
                <input className={styles.input} name='name' type="text" placeholder=" " autocomplete="off" required onChange={(e)=>setName(e.target.value)}/>
                <label htmlFor="">Name</label>
              </div>

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

              <button className={styles.button} onClick={signupAuth} type="submit">Submit</button>

              <div id="err"></div>
            </form>
          </div>
        </div>
      </section>


      

    </div>
   
 );
}

export default Signup;
