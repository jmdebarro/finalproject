import mongoose from "mongoose";
import userModel from "./user.js";

// Use for local server, but try and get acquainted with cloud DB
// mongoose.set("debug", true);

// mongoose
//   .connect("mongodb://localhost:27017/users", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .catch((error) => console.log(error));
// pushing for azure to deploy

function getUsers(name, job, empId) {
  let promise;
  if (
    name === undefined &&
    job === undefined &&
    empId === undefined
  ) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  } else if (empId) {
    promise = findUserByEmpId(empId);
  }
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function findUserByEmpId(empId) {
  return userModel.find({ empId: empId });
}

function findUserByNameAndJob(name, job) {
  return userModel.find({ name: name, job: job });
}

function deleteUserById(id) {
  return userModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  findUserByEmpId,
  findUserByNameAndJob,
  deleteUserById
};
