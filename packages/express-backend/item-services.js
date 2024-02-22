import mongoose from "mongoose";
import itemModel from "./item.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://127.0.0.1:27017/freeStuff", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getItems(filters, user) {
  let promise;
  console.log("Here");
  if ((filters === undefined) && (user === undefined)) {
    console.log("There");
    promise = itemModel.find({});
  } else if (filters && !user) {
    promise = findItemByFilters(filters);
  } else if (user && !filters) {
    promise = findItemByUser(user);
  } else {
    promise = itemModel.find({ filter: { $in: filters }, user: user });
  }
  return promise;
}


function findItemByUser(user) {
  return itemModel.find({ user: user });
}

function findItemByFilters(filters) {
  return itemModel.find({ filters: filters });
}


function findItemById(id) {
  return itemModel.findById(id);
}

function addItem(item) {
  const itemToAdd = new itemModel(item);
  const promise = itemToAdd.save();
  return promise;
}


function deleteItemById(id) {
  return itemModel.findByIdAndDelete(id);
}

export {
  addItem,
  getItems,
  findItemById,
  findItemByFilters,
  findItemByUser,
  deleteItemById
};
