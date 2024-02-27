import React from 'react';
import './Post.css';

class Post extends React.Component {
  render() {
    return (
      <div className="post-container">
        <h1>Post an Item</h1>
        <form>
          <label>
            Upload Photo:
            <input type="file" accept="image/*" />
          </label>
          <label>
            Description:
            <textarea placeholder="Write the item's description here..." />
          </label>
          <label>
            Pickup Instructions:
            <textarea placeholder="Write the pickup instructions here..." />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Post;