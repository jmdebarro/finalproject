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
  if (name === undefined && job === undefined) {
    promise = itemModel.find();
  } else if (name && !job) {
    promise = findItemByName(name);
  } else if (job && !name) {
    promise = findItemByJob(job);
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

function findItemByJob(job) {
  return itemModel.find({ job: job });
}

function findItemByNameAndJob(name, job) {
  return itemModel.find({ name: name, job: job });
}


function deleteItemById(id) {
  return itemModel.findByIdAndDelete(id);
}

export default {
  addItem,
  getItems,
  findItemById,
  findItemByName,
  findItemByJob,
  findItemByNameAndJob,
  deleteItemById,
};
