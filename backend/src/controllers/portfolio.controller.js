const db = require('../models');
const Portfolio = db.portfolio;

exports.getPortfolios = (req, res) => {
  Portfolio.find()
  .populate("portfolioDescriptionId")
  .populate({path: "images"})
  .then((result) => {
    res.status(200).send({
      portfolios: result,
    });
  })
}
