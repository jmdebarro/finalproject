import React, { useState, useEffect } from "react";
import MainComponent from "./Item";
import styles from "./MyProfile.module.css"; // Import the CSS module

function fetchItems(filter) {
  const url = filter
    ? `https://freestuff-api.azurewebsites.net/items?userId=${filter}`
    : "https://freestuff-api.azurewebsites.net/items";
  const promise = fetch(url);
  return promise;
}
function fetchUser(filter) {
  const url = `https://freestuff-api.azurewebsites.net/users?userName=${filter}`;
  const promise = fetch(url);
  return promise;
}
function MyProfile(props) {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetchItems(props.userId)
      .then((res) => res.json())
      .then((json) => setItems(json["items_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    fetchUser(props.userId)
      .then((res) => res.json())
      .then((json) => setUser(json[0]))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className={styles.container} id="MyProfile">
      <div className={styles.profile}>
        {/* Use the .profileBubble class for the profile image */}
        <div className={styles.profileInfo}>
          <h2>{user ? user.userName : "Not logged in"}</h2>
          <p>Email: {user ? user.email : "n/a"}</p>
          <p>Phone Number: {user ? user.phoneNumber : "n/a"}</p>
        </div>
      </div>
      <h2>My posted items:</h2>{" "}
      {/* Add a header before the items */}
      <MainComponent itemData={items} showDeleteButton={true} />
    </div>
  );
}

export default MyProfile;
