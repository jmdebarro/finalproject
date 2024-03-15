import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./settings.module.css";
//displays current user info and links to login and signup pages
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
    <div className={style.container} id="Settings">
      <div className={style.profile}>
        <div className={style.profileInfo}>
          <h2>
            Username: {user ? user.userName : "Not logged in"}
          </h2>
          <p>Email: {user ? user.email : "n/a"}</p>
          <p>Phone Number: {user ? user.phoneNumber : "n/a"}</p>
        </div>
      </div>
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
