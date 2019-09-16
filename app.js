const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");

app.use(express.json());

app.use("/api", apiRouter);

// TODO: 404 for stray endpoints

// TODO: error handlers

module.exports = app;
