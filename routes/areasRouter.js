const express = require("express");
const areasRouter = express.Router();
const { getAreas } = require("../controllers/getAreas");
const { postArea } = require("../controllers/postArea");
const { getRestaurantsByArea } = require("../controllers/getRestaurantsByArea");
const _ = require("../error");

areasRouter
  .route("/")
  .get(getAreas)
  .post(postArea)
  .all(_.errorHandler405);

areasRouter.route("/:area_id/restaurants").get(getRestaurantsByArea);

module.exports = areasRouter;
