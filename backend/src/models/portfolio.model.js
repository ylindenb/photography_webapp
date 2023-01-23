const mongoose = require("mongoose");

const Portfolio = mongoose.model(
  "Portfolio",
  new mongoose.Schema({
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
      }
    ],
    portfolioDescriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PortfolioDescription",
      required: true,
    }
  }),
);

module.exports = Portfolio;
