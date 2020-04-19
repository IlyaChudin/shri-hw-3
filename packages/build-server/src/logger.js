const { format, createLogger, transports } = require("winston");

module.exports = createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.colorize({ all: true }),
    format.printf(info => `${info.timestamp} ${info.level} - ${info.message}`)
  ),
  transports: [new transports.Console()]
});
