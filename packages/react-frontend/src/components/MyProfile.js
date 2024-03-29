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

//profile information of the currently logged-in user, along with a table of items they have posted.
//from this page a logged-in user can delete an item they have posted.
function MyProfile(props) {
  const [fetchTrigger, setFetchTrigger] = useState(0);
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
  useEffect(() => {
    fetchItems(props.userId)
      .then((res) => res.json())
      .then((json) => setItems(json["items_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, [fetchTrigger]);
  const handleItemDelete = () => {
    setFetchTrigger((prev) => prev + 1); // Increment to trigger re-fetch
  };

  return (
    <div className={styles.container} id="MyProfile">
      <div className={styles.profile}>
        <div className={styles.profileInfo}>
          <h2 id="username">
            {user ? user.userName : "Not logged in"}
          </h2>
          <p>Email: {user ? user.email : "n/a"}</p>
          <p>Phone Number: {user ? user.phoneNumber : "n/a"}</p>
        </div>
      </div>
      <h2>My posted items:</h2>{" "}
      <MainComponent
        key={items.length}
        itemData={items}
        showDeleteButton={true}
        onItemDelete={handleItemDelete}
      />
    </div>
  );
}

export default MyProfile;
