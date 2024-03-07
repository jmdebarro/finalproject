import React from "react";
import styles from "./Settings.module.css"; // Import the new CSS module
import { Link } from "react-router-dom";
import style from "./settings.module.css"

function Settings() {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.profileBubble}></div>{" "}
        {/* Use the .profileBubble class for the profile image */}
        <div className={styles.profileInfo}>
          <h2>Username</h2>
          <p>Email</p>
          <p>Phone Number</p>
        </div>
      </div>
      <h2>Settings:</h2> {/* Add a header for the settings */}
      <button className={styles.settingsButton}>
        Account Info
      </button>
      <button className={styles.settingsButton}>
        Marked Posts
      </button>
      <button className={styles.settingsButton}>
        Activity
      </button>
      <button className={styles.settingsButton}>Help</button>
      <button className={styles.settingsButton}>
        Delete Account
      </button>
       <button className={style.button}><Link to="/login">Log In</Link></button>
       <button className={style.button}><Link to="/signup">Sign Up</Link></button>
    </div>
  );
}

export default Settings;