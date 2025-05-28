import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    userId:{type: String,required: true,},
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneno: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

const ItemModel = mongoose.model("Item", itemSchema);

export default ItemModel;