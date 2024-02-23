// backend.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import itemModel from "./item.js"
import {
  addItem,
  getItems,
  findItemById,
  findItemByFilters,
  findItemByUser,
  deleteItemById
} from "./item-services.js";
// npm install dotenv, mongodb, cors

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
 
app.get("/", (req, res) => {
  console.log("Here, in beginning");
  res.send("Hello Slogrammers!");
});

app.get("/item", (req, res) => {
  console.log("Inside Get");
  const filters = req.query.filters;
  const user = req.query.user;
  getItems(filters, user).then((items) =>{
    res.send(items);
  }).catch((error) => {
    res.status(500).send("Internal Server Error");
  })
  });

app.post("/item", (req, res) => {
  const itemToAdd = req.body;
  const id = Math.floor(Math.random() * 100000).toString();
  itemToAdd["id"] = id;
  addItem(itemToAdd).then((item) => {
    if (item === undefined) {
      res.status(404).send("Unable to add item");
    } else {
      res.status(201).send(item);
    }
  }).catch((error) => {
    res.status(500).send("Internal Server Error")
  })
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
