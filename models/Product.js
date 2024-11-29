const mongoose = require("mongoose");

// ▼ Creating product document schema for collection ▼
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
  }
);

module.exports = mongoose.model("Product", productSchema);
