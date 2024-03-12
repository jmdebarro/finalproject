import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    }
  },
  { collection: "users_list" }
);

const User = mongoose.model("User", UserSchema);

export default User;
