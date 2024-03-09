import React from "react";
import style from "./table.module.css";
import { Link } from "react-router-dom";

function ItemBox(props) {
  return (
    <Link key={props._id} className={style.item_box} to={`/item/${props._id}`} {...props}>
      <div className={style.image}>
          <img src={`data:image/jpeg;base64,${props.image}`} alt="Base64 Image" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className={style.info}>
        <div className={style.description}>
          {props.description}<br/>
          Pick Up: {props.pickUpType} <br/>
          Location: {props.pickUpLocation}
        </div>
        <div className={style.user}>{props.user}</div>
      </div>
    </Link>
  );
}

function MainComponent(props) {
  return (
    <div className={style.item_container}>
      {props.itemData.map((item) => (
        <ItemBox key={item._id} {...item} />
      ))}
    </div>
  );
}

export default MainComponent;
