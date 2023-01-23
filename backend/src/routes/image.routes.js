const { authJwt } = require("../middlewares");
const db = require("../models");
const Image = db.image;
const Category = db.category;
const controller = require("../controllers/image.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/images", controller.getImages);

  app.get("/api/images/:imageId", controller.getImage);

  // Quelle: https://www.bezkoder.com/google-cloud-storage-nodejs-upload-file/
  app.post("/api/images", [authJwt.verifyToken, authJwt.isAdmin], controller.uploadImage);

  app.delete("/api/images/:imageId", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteImage)

};
