const db = require('../models');
const Category = db.category;
const mongoose = require('mongoose');

exports.getCategories = (req, res) => {
  Category.find()
  .populate("categoryDescriptionId")
  .populate({path: "images"})
  .then( (err, result) => {
    if (err) {
      res.status(500).send({ message: err});
      return;
    }
    res.status(200).send({
      portfolios: result,
    });
  })
}

exports.getCategory = (req, res) => {
  const categoryDescriptionId = new mongoose.Types.ObjectId(req.params.categoryDescriptionId);
  Category.findOne({
    categoryDescriptionId: categoryDescriptionId,
  })
    .populate("categoryDescriptionId")
    .populate({path: "images"})
    .exec((err, category) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!category) {
        return res.status(404).send({ message: "Category Not found." });
      }
      res.status(200).send({
        category: category
      });
    });
}
