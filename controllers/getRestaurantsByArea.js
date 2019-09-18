const { fetchRestaurantsByArea } = require("../models/fetchRestaurantsByArea");

exports.getRestaurantsByArea = (req, res, next) => {
  const { area_id } = req.params;
  fetchRestaurantsByArea(area_id)
    .then(response => res.status(200).send(response))
    .then(err => next(err));
};
