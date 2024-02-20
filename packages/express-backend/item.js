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
        if (value.length < 5)
          throw new Error("Invalid Item, must contain description of at least 5 characters");
      },
    },
    image: {
        type: Image,
        required: true,
        trim: true,
    },
    PickUp: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value != "Shipping" || value != "Meet-Up")
              throw new Error("Must include way to recieve Item");
        },
    },
  },
  { collection: "items_list" }
);

const Item = mongoose.model("Item", ItemSchema);

export default Item;