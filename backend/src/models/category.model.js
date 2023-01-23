const mongoose = require("mongoose");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
      }
    ],
    categoryDescriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryDescription",
      required: true,
    }
  }),
);

module.exports = Category;
