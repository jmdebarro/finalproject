import React, { useEffect, useState } from "react";
import style from "./table.module.css";
import { Link } from "react-router-dom";

function ItemBox(props) {

  const handleDelete = (e, id) => {
    e.preventDefault(); // Prevent navigating
  
    console.log("deleting this item:", id);
  
    // Confirm before deleting
    if (window.confirm(`Are you sure you want to delete this item: ${id}?`)) {
      fetch(`https://freestuff-api.azurewebsites.net/items/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Check if the response has content
          if (response.status !== 204) {
            return response.json();
          } else {
            // If no content, directly return to next then block
            return;
          }
        })
        .then((data) => {
          if (data) {
            console.log("Item deleted:", data);
          } else {
            console.log("Item deleted, no content in response");
          }
          // Call the onDelete function passed via props
          if (props.onDelete) {
            props.onDelete();
          }
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    }
  };
  


  return (
    <Link
      key={props._id}
      className={style.item_box}
      to={`/item/${props._id}`}
      {...props}
    >
      <div className={style.image} id="ItemBox">
        <img
          src={`data:image/jpeg;base64,${props.image}`}
          alt="Base64 Image"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className={style.info}>
        <div className={style.box}>
          Description: <br></br>
          {props.description}
        </div>
        <div className={style.box}>
          Pick Up: <br></br> {props.pickUpType}
        </div>
        <div className={style.box}>
          Location: <br></br>
          {props.pickUpLocation}
        </div>
        {props.showDeleteButton ? (
          <input type="button" value={"Delete"} onClick={(e) => handleDelete(e, props._id)} />
        ) : null}
      </div>
    </Link>
  );
}



function MainComponent(props) {

  return (
    <div className={style.item_container} id="MainComponent">
      {props.itemData.map((item) => (
        <ItemBox
          key={item._id}
          showDeleteButton={props.showDeleteButton}
          onDelete={props.onItemDelete}
          {...item}
        />
      ))}
    </div>
  );
}

export default MainComponent;
