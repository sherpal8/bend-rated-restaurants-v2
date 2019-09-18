const _ = {};

_.errorHandler404 = (req, res, next) => {
  res.status(404).send({ msg: "Page not found" });
};

_.psqlErrorHandler404 = (err, req, res, next) => {
  const codes = [404];
  if (codes.includes(err.code)) {
    res.status(404).send({ msg: "Page not found" });
  } else next(err);
};

_.psqlErrorHandler422 = (err, req, res, next) => {
  const codes = [422];
  if (codes.includes(err.code)) {
    res.status(422).send({ msg: "Unprocessable entity" });
  } else next(err);
};

_.psqlErrorHandler400 = (err, req, res, next) => {
  const codes = [400];
  if (codes.includes(err.code)) {
    res.status(400).send({ msg: "Bad request" });
  } else next(err);
};

_.psqlErrorHandler500 = (err, req, res, next) => {
  const codes = [500];
  if (codes.includes(err.code)) {
    res.status(500).send({ msg: "Server error" });
  } else next(err);
};

_.errorHandler405 = (req, res, next) => {
  res.status(405).send({ msg: "Invalid method" });
};

module.exports = _;
