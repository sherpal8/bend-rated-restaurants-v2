const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const _ = require("./error");

app.use(express.json());

app.use("/api", apiRouter);

// TODO: 404 for stray endpoints
app.use("*", _.errorHandler404);

// TODO: error handlers
app.use(_.psqlErrorHandler400);
app.use(_.psqlErrorHandler404);
app.use(_.psqlErrorHandler422);
app.use(_.psqlErrorHandler500);

module.exports = app;
