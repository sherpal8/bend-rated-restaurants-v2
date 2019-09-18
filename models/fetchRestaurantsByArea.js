const client = require("../db/index");

exports.fetchRestaurantsByArea = area_id => {
  return client
    .query(
      "SELECT * FROM restaurants JOIN areas ON areas.area_id=restaurants.area_id WHERE restaurants.area_id=($1);",
      [area_id]
    )
    .then(({ rows }) => {
      const processedRows = rows.map(row => {
        const processedRow = {
          restaurant_id: row.restaurant_id,
          area_id,
          name: row.areaname,
          cuisine: row.cuisine,
          website: row.website
        };
        return processedRow;
      });
      const returnObject = {
        area_id,
        name: rows[0].areaname,
        total_restaurants: rows.length,
        restaurants: processedRows
      };
      return returnObject;
    });
};
