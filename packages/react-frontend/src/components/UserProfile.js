import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./UserProfile.module.css";
import { Link } from "react-router-dom";
//NOT YET IMPLEMENTED, this feature was out of scope.
//profile for a different user than the one who is logged in.
function UserProfile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from backend
    axios
      .get("freestuff-api.azurewebsites.net/users")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div className={style.container}>
      {userData ? (
        <div>
          <h2>{userData.username}'s Profile</h2>
          <div className={style.contactInfo}>
            <p>Email: {userData.email}</p>
            <p>SMS: {userData.phoneNumber}</p>
          </div>
          <h3>Item Listings:</h3>
          <table className={style.itemTable}>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Description</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {userData.items.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  {/* Add more table data as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserProfile;
