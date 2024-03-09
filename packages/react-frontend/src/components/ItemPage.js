import React, { useState, useEffect } from "react";
import { useParams,  } from "react-router-dom";
import style from "./table.module.css";


function fetchItem(id) {
  const promise = fetch(
    `https://freestuff-api.azurewebsites.net/items/${id}`
  );
  return promise;
}

function ItemPage() {
    const [item, setItem] = useState([]);
    const { itemId } = useParams();
    useEffect(() => {
        fetchItem(itemId)
          .then((res) => res.json()) 
          .then((data) => setItem(data));
      }, [itemId]); 
    
  return (
    <div key={item._id} className={style.item_box}>
      <div className={style.image}>
        <img
          src={`data:image/jpeg;base64,${item.image}`}
          alt="Base64 Image"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className={style.info}>
        <div className={style.description}>
          {item.description}
          <br />
          Pick Up: {item.pickUpType} <br />
          Location: {item.pickUpLocation}
        </div>
        <div className={style.user}>{item.user}</div>
      </div>
    </div>
  );
}

export default ItemPage;
