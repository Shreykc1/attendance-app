import React, { useState, useEffect } from 'react';
import styles from '../styles/NumberSub.module.css';


import { initializeApp } from "firebase/app";
// import { Link,Route, Routes,useNavigate } from 'react-router-dom';
import { useNavigate  } from 'react-router';
import { getDatabase, ref, onValue, get, push, set, child,update } from "firebase/database";
import TextField from '../components/textfield';


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


const db = getDatabase();




function NumberSub() {
  const navigate = useNavigate();
  const [namee, setName] = useState('');
  const [Sub1, setSub1] = useState('');
  const [Sub2, setSub2] = useState('');
  const [Sub3, setSub3] = useState('');
  const [Sub4, setSub4] = useState('');
  const [Sub5, setSub5] = useState('');
  const [Sub6, setSub6] = useState('');
  const [Sub7, setSub7] = useState('');





  useEffect(() => {
    const dbRef = ref(db, 'users/');
  
    const fetchData = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const userKeys = [];
        snapshot.forEach((childSnapshot) => {
          userKeys.push(childSnapshot.key);
        });
        // Assuming you want the name of the first user found
        const firstUserId = userKeys[0];
        const namee = snapshot.child(firstUserId).child('name').val();
        if (namee) {
          setName(namee);
        }
      } else {
        console.log("No data available");
      }
    }, (error) => {
      console.error(error);
    });
  
    // Cleanup: Detach the listener when the component unmounts
    return () => fetchData();
  }, []);
  



  


function addSubjects(Sub1,Sub2,Sub3,Sub4,Sub5,Sub6,Sub7) {
  const db = getDatabase();

  // A post entry.
  const postData = {
    Sub1: Sub1,
    Sub2: Sub2,
    Sub3: Sub3,
    Sub4: Sub4,
    Sub5: Sub5,
    Sub6: Sub6,
    Sub7: Sub7,
  };

  const updates = {};
  updates['/subjects'] = postData;
  navigate('/Hero');

  return update(ref(db,`users/${namee}/`), updates);


}

  














  return (
    <div className={styles.container}>
      <div className={styles.titleText}>
        <h1>Hey {namee}!</h1>
      </div>

    <div className={styles.TextField}>
      <TextField name='Subject 1' type='text' setVar={setSub1} />
      <TextField name='Subject 2' type='text' setVar={setSub2} />
      <TextField name='Subject 3' type='text' setVar={setSub3} />
      <TextField name='Subject 4' type='text' setVar={setSub4} />
      <TextField name='Subject 5' type='text' setVar={setSub5} />
      <TextField name='Subject 6' type='text' setVar={setSub6} />
      <TextField name='Subject 7' type='text' setVar={setSub7} />
    </div>

    <button className={styles.SubBtn} onClick={() => addSubjects(Sub1, Sub2, Sub3, Sub4, Sub5, Sub6, Sub7)}>Submit</button>

    </div>
  );
}

export default NumberSub;