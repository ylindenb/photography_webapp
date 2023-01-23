const mongoose = require("mongoose");

const ProductCatalog = mongoose.model(
  "ProductCatalog",
  new mongoose.Schema({
    size: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    shipping_cost: {
      type: Number,
      required: true,
    },
  })
);

module.exports = ProductCatalog;
