const { authJwt } = require("../middlewares");
const controller = require("../controllers/order.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/orders", [authJwt.verifyToken, authJwt.isAdmin], controller.getOrders);

  app.get("/api/order/:orderId", authJwt.verifyToken, controller.getOrder);

  app.get("/api/orders/:userId",  authJwt.verifyToken, controller.getOrdersOfUser)

  app.get("/api/order", authJwt.verifyToken , controller.getOrderWithoutOrderId)

  app.post("/api/orders", authJwt.verifyToken, controller.createOrder);

  app.put("/api/orders", authJwt.verifyToken, controller.updateOrder);
};
