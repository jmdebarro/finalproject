import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 5) {
          throw new Error(
            "Invalid Item, must contain description of at least 5 characters"
          );
        }
      }
    },
    image: {
      type: String,
      required: true,
      trim: true
    },
    pickUpType: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value != "Drop Off" && value != "Meet Up") {
          throw new Error("Must include way to recieve Item");
        }
      }
    },
    pickUpLocation: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 5) {
          throw new Error(
            "Must include way a location to recieve Item"
          );
        }
      }
    },
    userId: {
      type: String,
      required: true,
      trim: true
    },
    tags: {
      type: String,
      required: true,
      trim: true
    }
  },
  { collection: "items" }
);

const Item = mongoose.model("items", ItemSchema);

export default Item;
