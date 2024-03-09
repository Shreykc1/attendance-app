import React from "react";
import styles from "./Navbar.module.css"

function Navbar (){



    return(
        <div className={styles.main}>
            <nav className={styles.nav}>
                <ul>
                    <li><img src="./favicon.ico"></img></li>
                    <li className={styles.title}>Attendose</li>
                </ul>
            </nav >
        </div>
    );
}

export default Navbar;