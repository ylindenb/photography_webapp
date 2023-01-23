  //Quelle: https://www.bezkoder.com/google-cloud-storage-nodejs-upload-file/, https://cloud.google.com/appengine/docs/flexible/using-cloud-storage?tab=python#node.js
const mongoose = require('mongoose');
const db = require('../models');
const { format } = require('util');
const Image = db.image;
const Category = db.category;
const Portfolio = db.portfolio;
const processFile = require("../middlewares/imageUpload");
const { Storage } = require("@google-cloud/storage");
const { isObjectIdOrHexString } = require('mongoose');
// Instantiate a storage client with credentials
const googleKeyStorage = new Storage({ projectId: "photography-webapp-cloud", keyFilename: "../photography-webapp-cloud-key.json" });
const bucket = googleKeyStorage.bucket("photography-webapp");

exports.getImages = (req, res) => {
  Image.find({}, (err, images) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      images: images,
    });
  }).limit(20);
}

exports.getImage = (req, res) => {
  const imageObjectId = new mongoose.Types.ObjectId(req.params.imageId);
  Image.findOne({
    _id: imageObjectId
  })
    .exec((err, image) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!image) {
        return res.status(404).send({ message: "Image Not found." });
      }
      res.status(200).send({
        id: image._id,
        smallLink: image.smallLink,
        largeLink: image.largeLink,
      });
    });
}

exports.deleteImage = (req, res) => {
  Image.deleteOne({_id: req.params.imageId}, (err, result) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if(!result) {
      res.status(404).send({ message: 'Image not found!' });
    }
    res.status(200).send({
      image: result,
    });
  })
}

exports.uploadImage = async (req, res) => {
  try {
    await processFile(req, res);

    if (!req.file) {
      return res.status(400).send({ message: 'Please upload a file!' });
    }
    
    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(new Date().toISOString() + '_' + req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
      res.status(500).send({ message: err.message });
    });
    
    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );
      
      let image = new Image({
        smallLink: publicUrl,
        largeLink: publicUrl,
      })

      let result = {
        categories: [],
        image: {},
        portfolios: [],
      };
      
      image.save((err, image) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if(req.body.categories) {
          const categoryArray = req.body.categories.split(",");
          let objectId
          for (let i = 0; i < categoryArray.length; i++) {
            objectId = new mongoose.Types.ObjectId(categoryArray[i]);
            Category.findOne({categoryDescriptionId: objectId }, (err, category) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              category.images.push(image._id);
              category.save((err, category) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                if (!category) {
                  res.status(404).send({ message: "Portfolio not found!"})
                  return;
                }
                result.categories.push(category);
              })
            })
          }
        }

        if(req.body.portfolios) {
          const portfolioArray = req.body.portfolios.split(",");
          let objectId
          for (let i = 0; i < portfolioArray.length; i++) {
            objectId = new mongoose.Types.ObjectId(portfolioArray[i]);
            Portfolio.findOne({portfolioDescriptionId: objectId }, (err, portfolio) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              if (!portfolio) {
                res.status(404).send({ message: "Portfolio not found!"})
                return;
              }
              portfolio.images.push(image._id);
              portfolio.save((err, portfolio) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                result.portfolios.push(portfolio);
              })
            })
          }
        }

        res.status(201).send({
          data: result,
        });
      })
    });
    
    blobStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: . ${err}`,
    });
  }
};
