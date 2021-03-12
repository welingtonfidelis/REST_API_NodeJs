const pgp = require('pg-promise')();
const db = pgp({
  user: 'root',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'api_rest_branas',
});

module.exports = db;