const express = require("express");
const areasRouter = express.Router();
const { getAreas } = require("../controllers/getAreas");

areasRouter.route("/").get(getAreas);

module.exports = areasRouter;
