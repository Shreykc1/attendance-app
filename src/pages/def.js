import React, { useState, useEffect } from 'react';
import styles from '../styles/Hero.module.css';
import { signOut } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router';
import {auth} from './firebase';
import { getDatabase, ref, onValue, get,set } from "firebase/database";
import Tilt from 'react-parallax-tilt';
import Spinner from '../components/spinner';

function Hero(props) {

  const sub = 26;

  const calculate = (subjectAttended) => {
    let value = (subjectAttended / sub) * 100;
    return value;
 };

 

 const [loading, setLoading] = useState(false);

 const [Sub1Attended, setSub1Attended] = useState(26);
 const [Sub2Attended, setSub2Attended] = useState(26);
 const [Sub3Attended, setSub3Attended] = useState(26);
 const [Sub4Attended, setSub4Attended] = useState(26);
 const [Sub5Attended, setSub5Attended] = useState(26);
 const [Sub6Attended, setSub6Attended] = useState(26);
 const [Sub7Attended, setSub7Attended] = useState(26);

 let [Sub1, setSub1] = useState(calculate(Sub1Attended).toFixed(2));
 let [Sub2, setSub2] = useState(calculate(Sub2Attended).toFixed(2));
 let [Sub3, setSub3] = useState(calculate(Sub3Attended).toFixed(2));
 let [Sub4, setSub4] = useState(calculate(Sub4Attended).toFixed(2));
 let [Sub5, setSub5] = useState(calculate(Sub5Attended).toFixed(2));
 let [Sub6, setSub6] = useState(calculate(Sub6Attended).toFixed(2));
 let [Sub7, setSub7] = useState(calculate(Sub7Attended).toFixed(2));
//  let [name,setName] = useState();
  const [subjects,setSubjects] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [name, setName] = useState(location.state.name);
  console.log("name: "+ name);

    

  
  const db = getDatabase();


  


  
  useEffect(() => {
    if (name) {
      setLoading(true);
      const countRef = ref(db, `users/${name}/attendance`);
  
      // Check if attendance data already exists
      get(countRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log("if");
            // If attendance data exists, fetch the data for Sub1, Sub2, etc.
            const attendanceData = snapshot.val();
            setSub1(calculate(parseFloat(attendanceData.Sub1Attended)).toFixed(2));
            setSub2(calculate(parseFloat(attendanceData.Sub2Attended)).toFixed(2));
            setSub3(calculate(parseFloat(attendanceData.Sub3Attended)).toFixed(2));
            setSub4(calculate(parseFloat(attendanceData.Sub4Attended)).toFixed(2));
            setSub5(calculate(parseFloat(attendanceData.Sub5Attended)).toFixed(2));
            setSub6(calculate(parseFloat(attendanceData.Sub6Attended)).toFixed(2));
            setSub7(calculate(parseFloat(attendanceData.Sub7Attended)).toFixed(2));    
            setSub1Attended(parseInt(attendanceData.Sub1Attended));
            setSub2Attended(parseInt(attendanceData.Sub2Attended));
            setSub3Attended(parseInt(attendanceData.Sub3Attended));
            setSub4Attended(parseInt(attendanceData.Sub4Attended));
            setSub5Attended(parseInt(attendanceData.Sub5Attended));
            setSub6Attended(parseInt(attendanceData.Sub6Attended));
            setSub7Attended(parseInt(attendanceData.Sub7Attended));
            setLoading(false);
          } else {
            console.log("else");
            // If attendance data doesn't exist, then create it
            createAttendanceTable();
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error checking attendance data:", error);
        });
    }
  }, [name] );


  
// Function to create the "attendance" table and set initial data










const createAttendanceTable = () => {
  
    const countRef = ref(db, `users/${name}/attendance/`);
    // Set initial data to the "attendance" table
    set(countRef, { 
      // Sub1: Sub1,
      // Sub2: Sub2,
      // Sub3: Sub3,
      // Sub4: Sub4,
      // Sub5: Sub5,
      // Sub6: Sub6,
      // Sub7: Sub7,
      Sub1Attended: Sub1Attended,
      Sub2Attended: Sub2Attended,
      Sub3Attended: Sub3Attended,
      Sub4Attended: Sub4Attended,
      Sub5Attended: Sub5Attended,
      Sub6Attended: Sub6Attended,
      Sub7Attended: Sub7Attended,
      
      
    })
        .then(() => {
          setLoading(false);
            console.log("Attendance table created and initial data set successfully.");
        })
        .catch((error) => {
            console.error("Error creating attendance table:", error);
        });
};





  const subjectsList = [];

  useEffect(() => {
    const dbRef = ref(db, 'users/' + name + '/subjects/');
  
    const fetchData = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        
        snapshot.forEach((childSnapshot) => {
          const subject = childSnapshot.val();
          subjectsList.push(subject);
        });
       
        console.log(subjectsList);
        // If you want to store the subjects list in state:
        setSubjects(subjectsList);
        
      } else {
        console.log("No subjects available");
      }
    }, (error) => {
      console.error(error);
    });
  
    // Cleanup: Detach the listener when the component unmounts
    return () => fetchData();
  }, [name]); // Adding name to dependency array ensures this useEffect runs whenever name changes
  




  
  const handleDecrement = (setSubjectAttended) => {
    console.log("Dec")
    setSubjectAttended(prev => prev -= 1);
    // const newSub1 = calculate(Sub1Attended); // Calculate new Sub1 value
    setSub1(calculate(Sub1Attended).toFixed(2)); // Update Sub1 state
    
    // Fetch current attendance object from the database
    const countRef = ref(db, `users/${name}/attendance/`);
    get(countRef).then((snapshot) => {
      if (snapshot.exists()) {
        const attendanceData = snapshot.val();
        
        // Update the desired subject value
        const updatedAttendanceData = { ...attendanceData,Sub1Attended:Sub1Attended };
        
        // Set the updated attendance object back into the database
        set(countRef, updatedAttendanceData).then(() => {
          console.log("Attendance updated successfully.");
        }).catch((error) => {
          console.error("Error updating attendance:", error);
        });
      } else {
        console.error("Attendance data does not exist.");
      }
    }).catch((error) => {
      console.error("Error fetching attendance data:", error);
    });
  };
  

  const handleIncrement = (setSubjectAttended) => {
    console.log("Inc")
    setSubjectAttended(prev => prev += 1);
    // const newSub1 = calculate(Sub1Attended); // Calculate new Sub1 value
    setSub1(calculate(Sub1Attended).toFixed(2)); // Update Sub1 state
    
    // Fetch current attendance object from the database
    const db = getDatabase();
    const countRef = ref(db, `users/${name}/attendance/`);
    get(countRef).then((snapshot) => {
      if (snapshot.exists()) {
        const attendanceData = snapshot.val();
        
        // Update the desired subject value
        const updatedAttendanceData = { ...attendanceData,Sub1Attended:Sub1Attended };
        
        // Set the updated attendance object back into the database
        set(countRef, updatedAttendanceData).then(() => {
          console.log("Attendance updated successfully.");
        }).catch((error) => {
          console.error("Error updating attendance:", error);
        });
      } else {
        console.error("Attendance data does not exist.");
      }
    }).catch((error) => {
      console.error("Error fetching attendance data:", error);
    });
  };
  

  const handleDecrementSub2 = (setSubjectAttended) => {
    setSubjectAttended(prev => prev -= 1);
    // const newSub2 = calculate(Sub2Attended); // Calculate new Sub2 value
    setSub2(calculate(Sub2Attended).toFixed(2)); // Update Sub2 state
    
    // Fetch current attendance object from the database
    const db = getDatabase();
    const countRef = ref(db, `users/${name}/attendance/`);
    get(countRef).then((snapshot) => {
      if (snapshot.exists()) {
        const attendanceData = snapshot.val();
        
        // Update the desired subject value
        const updatedAttendanceData = { ...attendanceData,Sub2Attended:Sub2Attended };
        
        // Set the updated attendance object back into the database
        set(countRef, updatedAttendanceData).then(() => {
          console.log("Attendance updated successfully.");
        }).catch((error) => {
          console.error("Error updating attendance:", error);
        });
      } else {
        console.error("Attendance data does not exist.");
      }
    }).catch((error) => {
      console.error("Error fetching attendance data:", error);
    });
  };
  
  const handleIncrementSub2 = (setSubjectAttended) => {
    setSubjectAttended(prev => prev + 1);
    // const newSub2 = parseFloat(Sub2) + parseFloat(calculate(Sub2Attended)); // Calculate new Sub2 value
    setSub2(calculate(Sub2Attended).toFixed(2)); // Update Sub2 state
    
    // Fetch current attendance object from the database
    const db = getDatabase();
    const countRef = ref(db, `users/${name}/attendance/`);
    get(countRef).then((snapshot) => {
      if (snapshot.exists()) {
        const attendanceData = snapshot.val();
        
        // Update the desired subject value
        const updatedAttendanceData = { ...attendanceData ,Sub2Attended:Sub2Attended};
        
        // Set the updated attendance object back into the database
        set(countRef, updatedAttendanceData).then(() => {
          console.log("Attendance updated successfully.");
        }).catch((error) => {
          console.error("Error updating attendance:", error);
        });
      } else {
        console.error("Attendance data does not exist.");
      }
    }).catch((error) => {
      console.error("Error fetching attendance data:", error);
    });
  };
  

  const handleDecrementSub3 = (setSubjectAttended) => {
    setSubjectAttended(prev => prev - 1);
    const newSub3 = calculate(Sub3Attended); // Calculate new Sub3 value
    setSub3(newSub3.toFixed(2)); // Update Sub3 state
    
    // Fetch current attendance object from the database
    const db = getDatabase();
    const countRef = ref(db, `users/${name}/attendance/`);
    get(countRef).then((snapshot) => {
      if (snapshot.exists()) {
        const attendanceData = snapshot.val();
        
        // Update the desired subject value
        const updatedAttendanceData = { ...attendanceData,Sub3Attended:Sub3Attended };
        
        // Set the updated attendance object back into the database
        set(countRef, updatedAttendanceData).then(() => {
          console.log("Attendance updated successfully.");
        }).catch((error) => {
          console.error("Error updating attendance:", error);
        });
      } else {
        console.error("Attendance data does not exist.");
      }
    }).catch((error) => {
      console.error("Error fetching attendance data:", error);
    });
  };
  
  const handleIncrementSub3 = (setSubjectAttended) => {
    setSubjectAttended(prev => prev + 1);
    const newSub3 = parseFloat(calculate(Sub3Attended)); // Calculate new Sub3 value
    setSub3(newSub3.toFixed(2)); // Update Sub3 state
    
    // Fetch current attendance object from the database
    const db = getDatabase();
    const countRef = ref(db, `users/${name}/attendance/`);
    get(countRef).then((snapshot) => {
      if (snapshot.exists()) {
        const attendanceData = snapshot.val();
        
        // Update the desired subject value
        const updatedAttendanceData = { ...attendanceData,Sub3Attended:Sub3Attended };
        
        // Set the updated attendance object back into the database
        set(countRef, updatedAttendanceData).then(() => {
          console.log("Attendance updated successfully.");
        }).catch((error) => {
          console.error("Error updating attendance:", error);
        });
      } else {
        console.error("Attendance data does not exist.");
      }
    }).catch((error) => {
      console.error("Error fetching attendance data:", error);
    });
  };
  

  const handleDecrementSub4 = (setSubjectAttended) => {
    setSubjectAttended(prev => prev - 1);
    const newSub4 = calculate(Sub4Attended); // Calculate new Sub4 value
    setSub4(newSub4.toFixed(2)); // Update Sub4 state
    
    // Fetch current attendance object from the database
    const db = getDatabase();
    const countRef = ref(db, `users/${name}/attendance/`);
    get(countRef).then((snapshot) => {
      if (snapshot.exists()) {
        const attendanceData = snapshot.val();
        
        // Update the desired subject value
        const updatedAttendanceData = { ...attendanceData,Sub4Attended:Sub4Attended };
        
        // Set the updated attendance object back into the database
        set(countRef, updatedAttendanceData).then(() => {
          console.log("Attendance updated successfully.");
        }).catch((error) => {
          console.error("Error updating attendance:", error);
        });
      } else {
        console.error("Attendance data does not exist.");
      }
    }).catch((error) => {
      console.error("Error fetching attendance data:", error);
    });
  };
  
  const handleIncrementSub4 = (setSubjectAttended) => {
    setSubjectAttended(prev => prev + 1);
    const newSub4 = parseFloat(calculate(Sub4Attended)); // Calculate new Sub4 value
    setSub4(newSub4.toFixed(2)); // Update Sub4 state
    
    // Fetch current attendance object from the database
    const db = getDatabase();
    const countRef = ref(db, `users/${name}/attendance/`);
    get(countRef).then((snapshot) => {
      if (snapshot.exists()) {
        const attendanceData = snapshot.val();
        
        // Update the desired subject value
        const updatedAttendanceData = { ...attendanceData,Sub4Attended:Sub4Attended };
        
        // Set the updated attendance object back into the database
        set(countRef, updatedAttendanceData).then(() => {
          console.log("Attendance updated successfully.");
        }).catch((error) => {
          console.error("Error updating attendance:", error);
        });
      } else {
        console.error("Attendance data does not exist.");
      }
    }).catch((error) => {
      console.error("Error fetching attendance data:", error);
    });
  }; 

  const handleDecrementSub5 = (setSubjectAttended) => {
    setSubjectAttended(prev => prev - 1);
    const newSub5 = calculate(Sub5Attended); // Calculate new Sub5 value
    setSub5(newSub5.toFixed(2)); // Update Sub5 state
    
    // Fetch current attendance object from the database
    const db = getDatabase();
    const countRef = ref(db, `users/${name}/attendance/`);
    get(countRef).then((snapshot) => {
      if (snapshot.exists()) {
        const attendanceData = snapshot.val();
        
        // Update the desired subject value
        const updatedAttendanceData = { ...attendanceData,Sub5Attended:Sub5Attended };
        
        // Set the updated attendance object back into the database
        set(countRef, updatedAttendanceData).then(() => {
          console.log("Attendance updated successfully.");
        }).catch((error) => {
          console.error("Error updating attendance:", error);
        });
      } else {
        console.error("Attendance data does not exist.");
      }
    }).catch((error) => {
      console.error("Error fetching attendance data:", error);
    });
  };
  
  const handleIncrementSub5 = (setSubjectAttended) => {
    setSubjectAttended(prev => prev + 1);
    const newSub5 = parseFloat(calculate(Sub5Attended)); // Calculate new Sub5 value
    setSub5(newSub5.toFixed(2)); // Update Sub5 state
    
    // Fetch current attendance object from the database
    const db = getDatabase();
    const countRef = ref(db, `users/${name}/attendance/`);
    get(countRef).then((snapshot) => {
      if (snapshot.exists()) {
        const attendanceData = snapshot.val();
        
        // Update the desired subject value
        const updatedAttendanceData = { ...attendanceData,Sub5Attended:Sub5Attended };
        
        // Set the updated attendance object back into the database
        set(countRef, updatedAttendanceData).then(() => {
          console.log("Attendance updated successfully.");
        }).catch((error) => {
          console.error("Error updating attendance:", error);
        });
      } else {
        console.error("Attendance data does not exist.");
      }
    }).catch((error) => {
      console.error("Error fetching attendance data:", error);
    });
  };
  

  const handleDecrementSub6 = (setSubjectAttended) => {
    setSubjectAttended(prev => prev - 1);
    const newSub6 = calculate(Sub6Attended); // Calculate new Sub6 value
    setSub6(newSub6.toFixed(2)); // Update Sub6 state
    
    // Fetch current attendance object from the database
    const db = getDatabase();
    const countRef = ref(db, `users/${name}/attendance/`);
    get(countRef).then((snapshot) => {
      if (snapshot.exists()) {
        const attendanceData = snapshot.val();
        
        // Update the desired subject value
        const updatedAttendanceData = { ...attendanceData, Sub6Attended:Sub6Attended };
        
        // Set the updated attendance object back into the database
        set(countRef, updatedAttendanceData).then(() => {
          console.log("Attendance updated successfully.");
        }).catch((error) => {
          console.error("Error updating attendance:", error);
        });
      } else {
        console.error("Attendance data does not exist.");
      }
    }).catch((error) => {
      console.error("Error fetching attendance data:", error);
    });
  };
  
  const handleIncrementSub6 = (setSubjectAttended) => {
    setSubjectAttended(prev => prev + 1);
    const newSub6 = parseFloat(calculate(Sub6Attended)); 
    setSub6(newSub6.toFixed(2)); 
    
    
    
    const countRef = ref(db, `users/${name}/attendance/`);
    get(countRef).then((snapshot) => {
      if (snapshot.exists()) {
        const attendanceData = snapshot.val();
        
        // Update the desired subject value
        const updatedAttendanceData = { ...attendanceData, Sub6Attended:Sub6Attended };
        
        // Set the updated attendance object back into the database
        set(countRef, updatedAttendanceData).then(() => {
          console.log("Attendance updated successfully.");
        }).catch((error) => {
          console.error("Error updating attendance:", error);
        });
      } else {
        console.error("Attendance data does not exist.");
      }
    }).catch((error) => {
      console.error("Error fetching attendance data:", error);
    });
  };
  

  const handleDecrementSub7 = (setSubjectAttended) => {
    setSubjectAttended(prev => prev - 1);
    const newSub7 = calculate(Sub7Attended); // Calculate new Sub7 value
    setSub7(newSub7.toFixed(2)); // Update Sub7 state
    
    // Fetch current attendance object from the database
    const countRef = ref(db, `users/${name}/attendance/`);
    get(countRef).then((snapshot) => {
      if (snapshot.exists()) {
        const attendanceData = snapshot.val();
        
        // Update the desired subject value
        const updatedAttendanceData = { ...attendanceData,Sub7Attended:Sub7Attended };
        
        // Set the updated attendance object back into the database
        set(countRef, updatedAttendanceData).then(() => {
          console.log("Attendance updated successfully.");
        }).catch((error) => {
          console.error("Error updating attendance:", error);
        });
      } else {
        console.error("Attendance data does not exist.");
      }
    }).catch((error) => {
      console.error("Error fetching attendance data:", error);
    });
  };
  
  const handleIncrementSub7 = (setSubjectAttended) => {
    setSubjectAttended(prev => prev + 1);
    const newSub7 = parseFloat(calculate(Sub7Attended)); // Calculate new Sub7 value
    setSub7(newSub7.toFixed(2)); // Update Sub7 state
    
    // Fetch current attendance object from the database
    
    const countRef = ref(db, `users/${name}/attendance/`);
    get(countRef).then((snapshot) => {
      if (snapshot.exists()) {
        const attendanceData = snapshot.val();
        
        // Update the desired subject value
        const updatedAttendanceData = { ...attendanceData,Sub7Attended:Sub7Attended };
        
        // Set the updated attendance object back into the database
        set(countRef, updatedAttendanceData).then(() => {
          console.log("Attendance updated successfully.");
        }).catch((error) => {
          console.error("Error updating attendance:", error);
        });
      } else {
        console.error("Attendance data does not exist.");
      }
    }).catch((error) => {
      console.error("Error fetching attendance data:", error);
    });
  };
  
 
  
  const logout = () => {
    
       signOut(auth).then(() => {
        navigate('/');
         alert("Signed out successfully");
         
       }).catch((error) => {
         console.error("Error signing out:", error);
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
  {/* {loading ? (
      <Spinner /> // Your loading component
    ) : ( */}
    <div className={styles.main}>
    <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={200} glareMaxOpacity={0}>
      <div className={styles.titleText}>

          <h1>WELCOME {name}! </h1>

      </div>
      </Tilt>

      <div className={styles.subjectContainer}>
        <h2> {subjects[0]} : {Sub1}%</h2>
        <button className={styles.minBtn} onClick={() => handleDecrement(setSub1Attended)} disabled={Sub1Attended <= 0}>-</button>
        <button className={styles.addBtn} onClick={() => handleIncrement(setSub1Attended)} disabled={calculate(Sub1Attended) > 100}>+</button>
      </div>

      <div className={styles.subjectContainer}>
        <h2>{subjects[1]} : {Sub2}%</h2>
        <button className={styles.minBtn} onClick={() => handleDecrementSub2(setSub2Attended)} disabled={Sub2Attended <= 0}>-</button>
        <button className={styles.addBtn} onClick={() => handleIncrementSub2(setSub2Attended)} disabled={calculate(Sub2Attended) >= 100}>+</button>
      </div>

      <div className={styles.subjectContainer}>
        <h2>{subjects[2]} : {Sub3}%</h2>
        <button className={styles.minBtn} onClick={() => handleDecrementSub3(setSub3Attended)} disabled={Sub3Attended <= 0}>-</button>
        <button className={styles.addBtn} onClick={() => handleIncrementSub3(setSub3Attended)} disabled={calculate(Sub3Attended) >= 100}>+</button>
      </div>

      <div className={styles.subjectContainer}>
        <h2>{subjects[3]} : {Sub4}%</h2>
        <button className={styles.minBtn} onClick={() => handleDecrementSub4(setSub4Attended)} disabled={Sub4Attended <= 0}>-</button>
        <button className={styles.addBtn} onClick={() => handleIncrementSub4(setSub4Attended)} disabled={calculate(Sub4Attended) >= 100}>+</button>
      </div>

      <div className={styles.subjectContainer}>
        <h2>{subjects[4]} : {Sub5}%</h2>
        <button className={styles.minBtn} onClick={() => handleDecrementSub5(setSub5Attended)} disabled={Sub5Attended <= 0}>-</button>
        <button className={styles.addBtn} onClick={() => handleIncrementSub5(setSub5Attended)} disabled={calculate(Sub5Attended) >= 100}>+</button>
      </div>

      <div className={styles.subjectContainer}>
        <h2>{subjects[5]} : {Sub6}%</h2>
        <button className={styles.minBtn} onClick={() => handleDecrementSub6(setSub6Attended)} disabled={Sub6Attended <= 0}>-</button>
        <button className={styles.addBtn} onClick={() => handleIncrementSub6(setSub6Attended)} disabled={calculate(Sub6Attended) >= 100}>+</button>
      </div>

      <div className={styles.subjectContainer}>
        <h2>{subjects[6]} : {Sub7}%</h2>
        <button className={styles.minBtn} onClick={() => handleDecrementSub7(setSub7Attended)} disabled={Sub7Attended <= 0}>-</button>
        <button className={styles.addBtn} onClick={() => handleIncrementSub7(setSub7Attended)} disabled={calculate(Sub7Attended) >= 100}>+</button>
      </div>


      <button onClick={logout} className={styles.logout}>Logout</button>

      
    </div>
   
   {/* )} */}
    </div>

    
   
 );
}

export default Hero;
