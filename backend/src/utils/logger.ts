import pino from "pino";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Winston file rotation transport
const fileRotateTransport = new DailyRotateFile({
  dirname: "logs",
  filename: "app-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d", // keep logs for 14 days
  level: "info",
});

// Winston logger (file)
const winstonLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    fileRotateTransport,
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  ],
});

// Pino logger (console)
const pinoLogger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  },
  level: "info",
});

// Unified logger
export const logger = {
  info: (msg: string) => {
    winstonLogger.info(msg);
    pinoLogger.info(msg);
  },
  warn: (msg: string) => {
    winstonLogger.warn(msg);
    pinoLogger.warn(msg);
  },
  error: (msg: string) => {
    winstonLogger.error(msg);
    pinoLogger.error(msg);
  },
  debug: (msg: string) => {
    winstonLogger.debug(msg);
    pinoLogger.debug(msg);
  },
};
