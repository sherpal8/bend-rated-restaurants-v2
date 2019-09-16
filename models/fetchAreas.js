const client = require("../db/index");

exports.fetchAreas = () => {
  return client.query("SELECT * FROM areas;").then(({ rows }) => {
    const areaObject = {
      total_areas: rows.length,
      areas: rows
    };
    return areaObject;
  });
};
