import React, { useState, useEffect } from "react";
// import  Table from "./Table";
import MainComponent from "./Item";
import addAuthHeader from "./FrontendHandler";

function ItemsTable() {
  const [items, setItems] = useState([]);
  function fetchItems() {
    const promise = fetch(
      "https://freestuff-api.azurewebsites.net/items",
      {
        headers: addAuthHeader()
      }
    );
    return promise;
  }
  useEffect(() => {
    fetchItems()
      .then((res) => res.json())
      .then((json) => setItems(json["items_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={"container"}>
      <MainComponent itemData={items} />
    </div>
  );
}

export default ItemsTable;
