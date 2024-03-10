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
      required: false,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: false,
      trim: true
    },
    empId: {
      type: String,
      required: false,
      trim: true,
      validate(value) {
        if (value.length < 3)
          throw new Error(
            "Invalid job, must be at least 2 characters."
          );
      }
    },
    job: {
      type: String,
      required: false,
      trim: true,
      validate(value) {
        if (value.length < 2)
          throw new Error(
            "Invalid job, must be at least 2 characters."
          );
      }
    }
  },
  { collection: "users_list" }
);

const User = mongoose.model("User", UserSchema);

export default User;
