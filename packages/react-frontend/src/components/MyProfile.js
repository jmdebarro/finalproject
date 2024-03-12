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
function MyProfile(props) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchItems(props.userId)
      .then((res) => res.json())
      .then((json) => setItems(json["items_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
      <h2>User's posted items:</h2>{" "}
      {/* Add a header before the items */}
      <MainComponent itemData={items} />
    </div>
  );
}

export default MyProfile;
