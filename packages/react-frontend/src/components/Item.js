import React, { useEffect, useState } from "react";
import style from "./table.module.css";
import { Link } from "react-router-dom";

function ItemBox(props) {
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
          <input type="button" value={"Delete"} />
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
          {...item}
        />
      ))}
    </div>
  );
}

export default MainComponent;
