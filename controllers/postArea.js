const { sendArea } = require("../models/sendArea");

exports.postArea = (req, res, next) => {
  const { areaname } = req.body;
  if (!areaname || areaname.length === 0 || typeof areaname !== "string") {
    return res.status(400).send({ msg: "Bad request" });
  }
  sendArea(areaname)
    .then(response => {
      res.status(201).send({ area: response });
    })
    .catch(err => next(err));
};
