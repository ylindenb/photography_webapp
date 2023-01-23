const mongoose = require("mongoose");

const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        image: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Image",
          required: true,
        },
        productCatalog: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductCatalog",
          required: true,
        }
      }
    ],
    status: {
      type: String,
      required: true,
    },
  })
);

module.exports = Order;
