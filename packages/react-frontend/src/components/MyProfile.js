import React from "react";
import MainComponent from "./Item";
import styles from "./MyProfile.module.css"; // Import the CSS module

const items = [
  {
    image: "IMAGE",
    user: "user",
    description: "This is item info",
    _id: "1234"
  },
  {
    image: "IMAGE",
    user: "person",
    description: "This is item info",
    _id: "321"
  }
];

function MyProfile() {
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
