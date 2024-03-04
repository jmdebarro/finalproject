import React from 'react';
import './Post.css';
import { useState } from "react";

function Post() {

  const [item, setItem] = useState({
    name: "",
    description: "",
    image: "",
    pickUpType: "Drop Off",
    pickUpLocation: "",
    userId: "this-user",
    tags: "Technology"
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  function postItem(item) {
    const promise = fetch("https://freestuff-api.azurewebsites.net/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(item),
    });

    return promise;
  }


  function submitForm(e) {
    e.preventDefault();
    console.log(item);
    postItem(item);
    setItem({name: "", description: "", image: "",
               pickUpType: "Drop Off", pickUpLocation: "", 
               userId: "this-user", tags: "Technology"});
  }


    return (
      <div className="post-container">
        <h1>Post an Item</h1>
        <form onSubmit={submitForm}>
          <div className="boxes">
            <div className="box">
              <h2>Photo & Description</h2>
              <label>
                Name:
                <input type="text" name="name" value={item.name} onChange={handleChange} placeholder="Enter item name..." />
              </label>
              <label>
                Upload Photo:
                <input type="text" name="image" value={item.image} onChange={handleChange} accept="image/*" />
              </label>
              <label>
                Description:
                <textarea name="description" value={item.description}
                 onChange={handleChange} placeholder="Write the item's description here..." />
              </label>
              <label>
                Tags:
                <select name="tags" value={item.tags} onChange={handleChange}>
                  <option value="Technology">Technology</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Sports">Sports</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Art">Art</option>
                </select>
              </label>
            </div>
            <div className="box">
              <h2>Pickup</h2>
              <label>
                Pickup Type:
                <select name="pickUpType" value={item.pickUpType} onChange={handleChange}>
                  <option value="Drop Off">Drop off</option>
                  <option value="Meet Up">Meet up</option>
                </select>
              </label>
              <label>
                Pickup Location:
                <textarea name="pickUpLocation" value={item.pickUpLocation}
                   onChange={handleChange} placeholder="Write the pickup location here..." />
              </label>
            </div>
          </div>
          <button type="submit" value="Submit" >Submit</button>
        </form>
      </div>
    );
}

export default Post;