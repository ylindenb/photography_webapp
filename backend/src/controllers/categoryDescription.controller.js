const db = require('../models');
const CategoryDescription = db.categoryDescription;

exports.getCategoryDescriptions = (req, res) => {
  CategoryDescription.find({}, (err, result) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      categoryDescriptions: result,
    });
  })
}
