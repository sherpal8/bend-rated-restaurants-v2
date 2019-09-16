const { Client } = require("pg");
const dbConfig = require("./config.js");

const client = new Client(dbConfig);

client
  .connect()
  .then(() => `connected to ${dbConfig.database} via port ${dbConfig.port}`)
  .catch(err => console.log(err));

module.exports = client;
