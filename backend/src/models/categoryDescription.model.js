const mongoose = require("mongoose");

const CategoryDescription = mongoose.model(
  "CategoryDescription",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    }
  })
);

module.exports = CategoryDescription;
