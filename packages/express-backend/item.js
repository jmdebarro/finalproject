import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
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
        if (value.length < 5) {
          throw new Error("Invalid Item, must contain description of at least 5 characters");
        }
      },
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
    pickUpType: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value != "Drop Off" && value != "Meet Up") {
              throw new Error("Must include way to recieve Item");
            }
        },
    },
    pickUpLocation: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 5) {
              throw new Error("Must include way a location to recieve Item");
            }
        },
    },
  },
  { collection: "items_list" }
);

const Item = mongoose.model("Item", ItemSchema);

export default Item;