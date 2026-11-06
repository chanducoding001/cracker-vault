const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {},
  {
    strict: false,
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
