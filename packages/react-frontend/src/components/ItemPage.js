import React, { useState, useEffect } from "react";
import { useParams,  } from "react-router-dom";
import style from "./item.module.css";


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
        <div className={style.generic}>
          <b>Description:</b> <br></br> {item.description}
        </div>
        <div className={style.generic}>
        <b>Pick Up:</b>  <br></br>{item.pickUpType}
        </div>
        <div className={style.generic}>
        <b>Location:</b>  <br></br>{item.pickUpType}
        </div>
        <div className={style.generic}>
        <b>Filter:</b>  <br></br>{item.tags}
        </div>
        <div className={style.generic}>{item.user}</div>
      </div>
    </div>
  );
}

export default ItemPage;
