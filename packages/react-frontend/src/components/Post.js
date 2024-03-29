import React from "react";
import "./Post.css";
import { useState } from "react";
//interface to post an item
function Post(props) {
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
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Get the result, and remove the prefix
        let base64String = e.target.result;
        const base64Data = base64String.split(",")[1]; // This removes the 'data:image/jpeg;base64,' part

        setItem((prevItem) => ({
          ...prevItem,
          image: base64Data // Set only the pure base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  function submitForm(e) {
    e.preventDefault();
    console.log(item);
    console.log("onSubmit");
    setItem({
      name: "",
      description: "",
      image: "",
      pickUpType: "Drop Off",
      pickUpLocation: "",
      userId: "this-user",
      tags: "Technology"
    });
    props.handleSubmit(item);
  }

  return (
    <form onSubmit={submitForm}>
      <div className="boxes">
        <div className="box">
          <h2>Photo & Description</h2>
          <label>
            Upload Photo:
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={item.description}
              onChange={handleChange}
              placeholder="Write the item's description here..."
            />
          </label>
          <label>
            Tags:
            <select
              name="tags"
              value={item.tags}
              onChange={handleChange}
            >
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
            <select
              name="pickUpType"
              value={item.pickUpType}
              onChange={handleChange}
            >
              <option value="Drop Off">Drop off</option>
              <option value="Meet Up">Meet up</option>
            </select>
          </label>
          <label>
            Pickup Location:
            <textarea
              name="pickUpLocation"
              value={item.pickUpLocation}
              onChange={handleChange}
              placeholder="Write the pickup location here..."
            />
          </label>
        </div>
      </div>
      <button type="submit" value="Submit">
        Submit
      </button>
    </form>
  );
}

export default Post;
