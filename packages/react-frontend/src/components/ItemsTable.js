import React, { useState, useEffect } from "react";
// import  Table from "./Table";
import MainComponent from "./Item";

function ItemsTable() {

const [items, setItems] = useState([]);

useEffect(() => {
  fetchItems()
    .then((res) => res.json())
    .then((json) => setItems(json["items_list"]))
    .catch((error) => { console.log(error); });
}, [] );

return (
    <div className={"container"}>
      <MainComponent itemData={items} />
    </div>
  );
}

function fetchItems() {
  const promise = fetch("http://localhost:8000/items");
  return promise;
}


export default ItemsTable;
