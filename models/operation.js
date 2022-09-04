import mongoose from "mongoose";

const operationSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Product",
  },
  type: String,
  amount: { type: Number, required: true, default: 1 },
  date: { type: Number, required: true, default: Date.now() },
});

const Operation =
  mongoose.models.Operation ||
  mongoose.model("Operation", operationSchema, "operations");

module.exports = Operation;
