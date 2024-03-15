import mongoose from "mongoose";
import User from "./user.js";

import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

//stored on azure setup or local .env file
const uri = process.env.MONGO_URI;

connectToDB()
  .then(() => {
    console.log("userServices connected to DB");
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

function getUsers(name, job, empId) {
  let promise;
  if (
    name === undefined &&
    job === undefined &&
    empId === undefined
  ) {
    promise = User.find();
  }
  return promise;
}

function findUserById(id) {
  return User.findById(id);
}

function addUser(user) {
  console.log("adding user");
  const userToAdd = new User(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByUserName(userName) {
  return User.find({ userName: userName });
}

function deleteUserById(id) {
  return User.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByUserName,
  deleteUserById
};
