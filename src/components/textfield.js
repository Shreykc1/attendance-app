import React, { useState, useEffect } from 'react';
import styles from '../components/TextField.module.css';


function TextField(props) {

    return (
        <div className={styles.main} >
            <section className={styles.section}>

                <div className={styles.formbox}>
                    <div className={styles.formvalue}>
                        <form action="" id="login-form" >

                            <div className={styles.inputbox}>
                                <input className={styles.input}  name={props.name} type={props.type} placeholder=" " autocomplete="off" required onChange={(e) => props.setVar(e.target.value)} />
                                <label htmlFor="">{props.name}</label>
                            </div>

                        </form>
                    </div>
                </div>
            </section>
        </div>
    );

}


export default TextField;