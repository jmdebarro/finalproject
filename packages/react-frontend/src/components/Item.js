import React from "react";
import style from "./table.module.css"

function ItemBox(props) {
    return (
    <div key={props._id} className={style.item_box}>
      {props.image}
      {props.description}
      {props.user}
    </div>
    )
}
  
function MainComponent(props) {
return (
    <div className={style.item_container}>
    {props.itemData.map((item) => (
        <ItemBox key={item._id} {...item} />
    ))}
    </div>
);
};

export default MainComponent;