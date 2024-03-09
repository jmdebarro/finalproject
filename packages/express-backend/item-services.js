import mongoose from "mongoose";
import itemModel from "./item.js";

import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;

connectToDB()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log("Failed to connect to DB");
  });

async function connectToDB() {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  });
}

function getItems(name, tags, userId) {
  let promise;
  // console.log(
  //   "name: %s\ntags: %s, userId: %s\n\n",
  //   name,
  //   tags,
  //   userId
  // );

  if (
    tags === undefined &&
    name === undefined &&
    userId === undefined
  ) {
    promise = itemModel.find({});
  } else if (name != undefined) {
    promise = findItemByName(name);
  } else if (userId != undefined) {
    promise = findItemByUserId(userId);
  } else if (tags != undefined && userId != undefined) {
    promise = findItemByTagsAndUserId(tags, userId);
  } else {
    promise = findItemByTags(tags);
  }
  return promise;
}

function findItemByUserId(userId) {
  return itemModel.find({ userId: userId });
}

function findItemByTags(tags) {
  console.log("In findItemByTags\ntags: %s\n\n", tags);
  // This is doing an exact match, we need to use a regular expression.
  //return itemModel.find({ tags: { $in: tags } });
  const tagRegex = new RegExp(tags, "i");
  return itemModel.find({ tags: { $regex: tagRegex } });
}

function findItemByTagsAndUserId(tags, userId) {
  console.log(
    "In findItemByTagsAndUserId\nname: %s\ntags: %s, userId: %s\n\n",
    tags,
    userId
  );
  //return itemModel.find({ tags: { $in: tags }, userId: userId });

  const tagRegex = new RegExp(tags, "i");
  return itemModel.find({
    tags: { $regex: tagRegex },
    userId: userId
  });
}

function findItemById(id) {
  return itemModel.findById(id);
}

function addItem(item) {
  const itemToAdd = new itemModel(item);
  const promise = itemToAdd.save();
  return promise;
}

function updateItemById(id, updatedProperties) {
  // The { new: true } option ensures that the function returns the updated document.
  // The { useFindAndModify: false } option is sometimes used to opt-in to using the native MongoDB driver's findOneAndUpdate function instead of Mongoose's findAndModify function. This option is not needed for Mongoose 6 and above.
  const options = { new: true };
  return itemModel.findByIdAndUpdate(id, updatedProperties, options).exec();
}

function deleteItemById(id) {
  return itemModel.findByIdAndDelete(id);
}

export default {
  addItem,
  updateItemById,
  getItems,
  findItemById,
  findItemByTags,
  findItemByUserId,
  findItemByTagsAndUserId,
  deleteItemById
};
