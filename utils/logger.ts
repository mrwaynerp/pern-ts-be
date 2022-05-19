import pino from "express-pino-logger";

module.exports = pino({
	redact: ["req.headers.authorization"],
});
