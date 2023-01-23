const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.image = require("./image.model");
db.category = require("./category.model");
db.categoryDescription = require("./categoryDescription.model");
db.portfolio = require("./portfolio.model");
db.portfolioDescription = require("./portfolioDescription.model");
db.productCatalog = require("./productCatalog.model");
db.order = require("./order.model");

db.ROLES = ["user", "admin"];

module.exports = db;
