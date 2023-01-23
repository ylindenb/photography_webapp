const db = require('../models');
const Order = db.order;
const mongoose = require('mongoose');

exports.getOrders = (req, res) => {
  Order.find( { status: { $ne: 'Open' }})
  .populate({path: "user", select: '-password'})
  .populate({path: "products.image"})
  .populate({path: "products.productCatalog"})
  .exec( (err, result) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      orders: result,
    });
  })
}

exports.getOrdersOfUser = (req, res) => {
  if (req.params.userId) {
    const userId = new mongoose.Types.ObjectId(req.params.userId);
    Order.find( { $and: [ {user: userId}, { status: { $ne: 'Open'}}]})
    .populate({path: "user", select: '-password'})
    .populate({path: "products.image"})
    .populate({path: "products.productCatalog"})
    .exec( (err, result) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({
        orders: result,
      });
    })
  }
}

exports.getOrder = (req, res) => {
  const orderId = new mongoose.Types.ObjectId(req.params.orderId);
  Order.findOne({
    _id: orderId,
  })
    .populate({path: "user", select: '-password'})
    .populate({path: "products.image"})
    .populate({path: "products.productCatalog"})
    .exec((err, order) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!order) {
        return res.status(404).send({ message: "Order Not found." });
      }
      res.status(200).send({
        order: order
      });
    });
}


exports.updateOrder = (req, res) => {
  if(!req.body.products) {
    res.status(400).send({ message: 'Products are missing!'})
  }
  if(!req.body.status) {
    res.status(400).send({ message: 'Status ist missing!'})
  }
  orderId = new mongoose.Types.ObjectId(req.body._id);
  Order.findOne({ _id: orderId }, (err, order) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    order.products = req.body.products;
    order.status = req.body.status;
    order.save((err, order) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      Order.findOne({
        _id: order._id,
      })
        .populate({path: "user", select: '-password'})
        .populate({path: "products.image"})
        .populate({path: "products.productCatalog"})
        .exec((err, order) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          if (!order) {
            return res.status(404).send({ message: "Order Not found." });
          }
          res.status(200).send({
            order: order
          });
        });
    })
  })
}

exports.createOrder = (req, res) => {
  if (req.body.products) {
    const orderObj = new Order({
      user: req.body.user,
      products: req.body.products,
      status: req.body.status
    });
    orderObj.save((err, order) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      Order.findOne({
        _id: order._id,
      })
        .populate({path: "user", select: '-password'})
        .populate({path: "products.image"})
        .populate({path: "products.productCatalog"})
        .exec((err, order) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.status(201).send({
            order: order
          });
        });
    })
  } else {
    res.status(400).send({ message: "Order ist nicht richtig gesetzt, Beispiel: order: { user: userId, products: [{ image: imageId, productCategory: productId }], status: statusString"})
  }
}

exports.getOrderWithoutOrderId = (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.query.userId);
  Order.findOne({
    user: userId,
    status: "Open"
  })
    .populate({path: "user", select: '-password'})
    .populate({path: "products.image"})
    .populate({path: "products.productCatalog"})
    .exec((err, order) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!order) {
        return res.status(404).send({ message: "Order Not found." });
      }
      res.status(200).send({
        order: order
      });
    });
}