const AuthPool = require("pg").Pool;

const authObj = new AuthPool({
	user: process.env.POSTGRES_DB_USER,
	password: process.env.POSTGRES_DB_PASS,
	host: "localhost",
	port: 5108,
	database: "perntodo-auth",
});

module.exports = authObj;
