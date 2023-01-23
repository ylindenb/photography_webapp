const db = require('../models');
const ProductCatalog = db.productCatalog;

exports.getProductCatalogs = (req, res) => {
  ProductCatalog.find({}, (err, result) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      productCatalogs: result,
    });
  })
}
