const mongoose = require("mongoose");

const Image = mongoose.model(
  "Image",
  new mongoose.Schema({
    smallLink: {
      type: String,
      required: true,
    },
    largeLink: {
      type: String,
      required: true,
    },
  })
);

module.exports = Image;
