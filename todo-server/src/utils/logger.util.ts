import { RequestHandler } from "express";
import * as moment from "moment";
import * as morgan from "morgan";
import * as winston from "winston";


const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss.SSS";
const HTTP_FORMAT = ":method :url :status :response-time ms :remote-addr - :user-agent";

/**
 * The custom-configured Winston logger.
 */
const logger = winston;
logger.configure({
    exitOnError: false,
    transports: [
        new winston.transports.Console({
            level: process.env.LOG_LEVEL || "info",
            colorize: true,
            timestamp: () => moment().format(DATE_FORMAT)
        })
    ]
});

/**
 * Express HTTP error middleware logging function.
 */
const errorHttpLogger: () => RequestHandler = () => {
    return morgan(HTTP_FORMAT, {
        skip: (req, res) => res.statusCode < 400,
        stream: {
            write: message => {
                logger.error(message.trim());
            }
        }
    });
};

/**
 * Express HTTP info middleware logging function.
 */
const infoHttpLogger: () => RequestHandler = () => {
    return morgan(HTTP_FORMAT, {
        skip: (req, res) => res.statusCode >= 400,
        stream: {
            write: message => {
                logger.info(message.trim());
            }
        }
    });
};

export { logger, errorHttpLogger, infoHttpLogger };
