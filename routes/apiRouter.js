const express = require("express");
const apiRouter = express.Router();
const areasRouter = require("./areasRouter");

apiRouter.use("/areas", areasRouter);

module.exports = apiRouter;
