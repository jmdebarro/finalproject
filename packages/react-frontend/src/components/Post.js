import React from 'react';
import './Post.css';

class Post extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
  }

  render() {
    return (
      <div className="post-container">
        <h1>Post an Item</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="boxes">
            <div className="box">
              <h2>Photo & Description</h2>
              <label>
                Name:
                <input type="text" placeholder="Enter item name..." />
              </label>
              <label>
                Upload Photo:
                <input type="file" accept="image/*" />
              </label>
              <label>
                Description:
                <textarea placeholder="Write the item's description here..." />
              </label>
              <label>
                Tags:
                <input type="text" placeholder="Enter tags..." />
              </label>
            </div>
            <div className="box">
              <h2>Pickup</h2>
              <label>
                Pickup Type:
                <select>
                  <option>Drop off</option>
                  <option>Meet up</option>
                </select>
              </label>
              <label>
                Pickup Instructions:
                <textarea placeholder="Write the pickup instructions here..." />
              </label>
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Post;