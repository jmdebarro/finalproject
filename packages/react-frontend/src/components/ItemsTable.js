import React, { useState, useEffect } from "react";
// import  Table from "./Table";
import MainComponent from "./Item";

function ItemsTable({ selectedFilter }) {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchItems(selectedFilter)
      .then((res) => res.json())
      .then((json) => setItems(json["items_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, [selectedFilter]);

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setUsers(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={"container"} id="ItemsTable">
      <MainComponent itemData={items} />
    </div>
  );
}

function fetchItems(filter) {
  const url = filter
    ? `https://freestuff-api.azurewebsites.net/items?tags=${filter}`
    : "https://freestuff-api.azurewebsites.net/items";
  const promise = fetch(url);
  return promise;
}

function fetchUsers() {
  const promise = fetch(
    "https://freestuff-api.azurewebsites.net/users"
  );
  return promise;
}

export default ItemsTable;
