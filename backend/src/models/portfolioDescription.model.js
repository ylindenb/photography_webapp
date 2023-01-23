const mongoose = require("mongoose");

const PortfolioDescription = mongoose.model(
  "PortfolioDescription",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    }
  })
);

module.exports = PortfolioDescription;
