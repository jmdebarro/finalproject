import React, { useState, useEffect } from "react";
// import  Table from "./Table";
import MainComponent from "./Item";

<<<<<<< HEAD:packages/react-frontend/src/components/MyApp.js
function MyApp() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems()
      .then((res) => res.json())
      .then((json) => setItems(json["items_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

=======
// Default Domain: freestuff-api.azurewebsites.net
// Where we will fetch backend info from eventually

const items = [
  {
    image: "IMAGE",
    user: "user",
    description: "This is item info",
    _id: "1234"
  },
  {
    image: "IMAGE",
    user: "person",
    description: "This is item info",
    _id: "321"
  }
];

function ItemsTable() {
>>>>>>> bbbfc3887e78c9d411bd074caf1b4d7da4c7fadd:packages/react-frontend/src/components/ItemsTable.js
  return (
    <div className={"container"}>
      <MainComponent itemData={items} />
    </div>
  );
}
<<<<<<< HEAD:packages/react-frontend/src/components/MyApp.js

function fetchItems() {
  const promise = fetch("http://localhost:8000/items");
  return promise;
}

export default MyApp;
=======
export default ItemsTable;
>>>>>>> bbbfc3887e78c9d411bd074caf1b4d7da4c7fadd:packages/react-frontend/src/components/ItemsTable.js
