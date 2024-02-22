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
        if (value.length < 5)
          throw new Error("Invalid Item, must contain description of at least 5 characters");
      },
    },
    image: {
        type: String,
        required: true,
    },
    pickUp: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value != "Shipping" && value != "Meet-Up")
              throw new Error("Must include way to recieve Item");
        },
    },
    filter: {
      type: String,
      required: true,
    },
  },
  { collection: "items" }
);

const Item = mongoose.model("items", ItemSchema);

export default Item;