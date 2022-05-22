const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl : { rejectUnauthorized: false }
  });

module.exports = {
    /**
   * Makes a raw query to the linked database.
   * @param {string} sqlQuery - pl/pgsql query.
   * @param {string[]} params - String's array of parameters that comes from the query.
   */
  query: (sqlQuery, params) => pool.query(sqlQuery, params),
}