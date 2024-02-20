import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 2)
          throw new Error("Invalid Item, must contain description and picture ");
      },
    },
  },
  { collection: "items_list" }
);

const Item = mongoose.model("Item", ItemSchema);

export default Item;