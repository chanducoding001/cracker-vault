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




// const mongoose = require("mongoose");

// const itemSchema = new mongoose.Schema(
//   {
//     itemName: {
//       type: String,
//       required: [true, "Item name is required"],
//       trim: true,
//     },

//     itemCode: {
//       type: String,
//       required: [true, "Item code is required"],
//       trim: true,
//       unique: true,
//     },

//     category: {
//       type: String,
//       trim: true,
//       default: "",
//     },

//     hsn: {
//       type: String,
//       trim: true,
//       default: "",
//     },

//     salePrice: {
//       type: Number,
//       required: [true, "Sale price is required"],
//       min: [0, "Sale price cannot be negative"],
//     },

//     purchasePrice: {
//       type: Number,
//       required: [true, "Purchase price is required"],
//       min: [0, "Purchase price cannot be negative"],
//     },

//     discountType: {
//       type: String,
//       enum: ["Percentage", "Fixed", ""],
//       default: "",
//       trim: true,
//     },

//     saleDiscount: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     openingStockQuantity: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     minimumStockQuantity: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     itemLocation: {
//       type: String,
//       trim: true,
//       default: "",
//     },

//     taxRate: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     inclusiveOfTax: {
//       type: Boolean,
//       default: false,
//     },

//     basicUnit: {
//       type: String,
//       trim: true,
//       default: "",
//     },

//     secondaryUnit: {
//       type: String,
//       trim: true,
//       default: "",
//     },

//     conversionRate: {
//       type: Number,
//       default: 1,
//       min: 0,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Item", itemSchema);
