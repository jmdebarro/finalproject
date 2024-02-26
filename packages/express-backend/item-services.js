import mongoose from "mongoose";
import itemModel from "./item.js";

import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv'
dotenv.config()

const uri = "mongodb+srv://" + process.env.MONGO_USER +":" +  process.env.MONGO_PASSWORD + "@cluster0.qujzjab.mongodb.net/freeStuff?retryWrites=true&w=majority&appName=Cluster0";

try {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  if (mongoose.connection.readyState === 1) {
    console.log('Connected to MongoDB');
  } else {
    console.error('Failed to connect to MongoDB');
  }
} catch (error) {
  console.error('Error connecting to MongoDB', error);
}

// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });


function getItems(filters, user) {
  let promise;
  if ((filters === undefined) && (user === undefined)) {
    console.log("There");
    promise = itemModel.find({});
    console.log("Completed Get")
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

export default {
  addItem,
  getItems,
  findItemById,
  findItemByFilters,
  findItemByUser,
  deleteItemById
};
