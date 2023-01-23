const db = require('../models');
const PortfolioDescription = db.portfolioDescription;

exports.getPortfolioDescriptions = (req, res) => {
  PortfolioDescription.find({}, (err, result) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      portfolioDescriptions: result,
    });
  })
}
