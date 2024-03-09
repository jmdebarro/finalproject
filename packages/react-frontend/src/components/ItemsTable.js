import React, { useState, useEffect } from "react";
// import  Table from "./Table";
import MainComponent from "./Item";

function ItemsTable() {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchItems()
      .then((res) => res.json())
      .then((json) => setItems(json["items_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setUsers(json["users_list"]))
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

function fetchItems() {
  const promise = fetch(
    "https://freestuff-api.azurewebsites.net/items"
  );
  return promise;
}

function fetchUsers() {
  const promise = fetch("https://freestuff-api.azurewebsites.net/users");
  return promise;
}

export default ItemsTable;
