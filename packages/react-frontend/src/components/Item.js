import React from "react";
import style from "./table.module.css";

function ItemBox(props) {
  return (
    <div key={props._id} className={style.item_box}>
      <div className={style.image}>{props.image}</div>
      <div className={style.info}>
        <div className={style.description}>
          {props.description}
        </div>
        <div className={style.user}>{props.user}</div>
      </div>
    </div>
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
