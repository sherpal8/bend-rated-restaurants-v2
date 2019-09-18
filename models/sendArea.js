const client = require("../db/index");

exports.sendArea = areaname => {
  return client
    .query("INSERT INTO areas (areaname) VALUES ($1) RETURNING *;", [areaname])
    .then(({ rows }) => {
      return rows[0];
    });
};
