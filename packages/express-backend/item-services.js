import mongoose from "mongoose";
import itemModel from "./item.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/items", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getItems(name, job) {
  let promise;
  if (name === undefined) {
    promise = itemModel.find();
  }
  return promise;
}

function findItemById(id) {
  return itemModel.findById(id);
}

function addItem(item) {
  const itemToAdd = new itemModel(item);
  const promise = itemToAdd.save();
  return promise;
}

function findItemByName(name) {
  return itemModel.find({ name: name });
}


function deleteItemById(id) {
  return itemModel.findByIdAndDelete(id);
}

export default {
  addItem,
  getItems,
  findItemById,
  findItemByName,
  deleteItemById,
};
