const { fetchAreas } = require("../models/fetchAreas");

exports.getAreas = (req, res, next) => {
  fetchAreas()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => next(err));
};
