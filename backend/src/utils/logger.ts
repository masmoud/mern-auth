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
    winston.format.printf(({ level, message, timestamp, ...meta }) => {
      return `[${timestamp}] ${level}: ${message} ${
        Object.keys(meta).length ? JSON.stringify(meta) : ""
      }`;
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
  info: (message: string, data?: any) => {
    winstonLogger.info(message, data);
    pinoLogger.info(data ? { message, ...data } : message);
  },
  warn: (message: string, data?: any) => {
    winstonLogger.warn(message, data);
    pinoLogger.warn(data ? { message, ...data } : message);
  },
  error: (message: string, data?: any) => {
    winstonLogger.error(message, data);
    pinoLogger.error(data ? { message, ...data } : message);
  },
  debug: (message: string, data?: any) => {
    winstonLogger.debug(message, data);
    pinoLogger.debug(data ? { message, ...data } : message);
  },
};
