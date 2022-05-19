const Pool = require("pg").Pool;

const poolObj = new Pool({
	user: process.env.POSTGRES_DB_USER,
	password: process.env.POSTGRES_DB_PASS,
	host: "localhost",
	port: 5107,
	database: process.env.POSTGRES_DB_NAME,
});

module.exports = poolObj;
