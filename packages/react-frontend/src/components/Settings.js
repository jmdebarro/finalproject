import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./settings.module.css";

function Settings(props) {
  const [user, setUser] = useState([]);
  function fetchUser(filter) {
    const url = `https://freestuff-api.azurewebsites.net/users?userName=${filter}`;
    const promise = fetch(url);
    return promise;
  }
  useEffect(() => {
    fetchUser(props.userId)
      .then((res) => res.json())
      .then((json) => setUser(json[0]))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className={style.container}>
      <div className={style.profile}>
        {/* Use the .profileBubble class for the profile image */}
        <div className={style.profileInfo}>
          <h2>
            Username: {user ? user.userName : "Not logged in"}
          </h2>
          <p>Email: {user ? user.email : "n/a"}</p>
          <p>Phone Number: {user ? user.phoneNumber : "n/a"}</p>
        </div>
      </div>
      {/* <button className={styles.settingsButton}>
        Marked Posts
      </button>
      <button className={styles.settingsButton}>
        Activity
      </button>
      <button className={styles.settingsButton}>Help</button>
      <button className={styles.settingsButton}>
        Delete Account
      </button> */}
      <button className={style.button}>
        <Link to="/login">Log In</Link>
      </button>
      <button className={style.button}>
        <Link to="/signup">Sign Up</Link>
      </button>
    </div>
  );
}

export default Settings;
