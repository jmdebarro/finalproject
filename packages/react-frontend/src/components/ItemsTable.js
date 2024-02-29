import React from "react";
// import  Table from "./Table";
import MainComponent from "./Item";

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
  return (
    <div className={"container"}>
      <MainComponent itemData={items} />
    </div>
  );
}
export default ItemsTable;
