import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors/app-errors";
import { logger } from "../utils/logger";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Global Error Handler
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : res.statusCode !== 200 ? res.statusCode : 500;
  const isDev = process.env.NODE_ENV === "development";
  const timestamp = new Date().toISOString();

  // Clean stack trace
  const stackLines = (err.stack || "")
    .split("\n")
    .map((line) => line.trim())
    .slice(0, 10);

  // Logging
  const logLines = [
    "Request Failed",
    `method: ${req.method}`,
    `path: ${req.originalUrl}`,
    `status: ${statusCode}`,
    `timestamp: ${timestamp}`,
    `message: ${err.message}`,
  ];

  if (isDev && stackLines.length) {
    logLines.push("stack:", ...stackLines);
  }

  logger.error(logLines.join("\n"));

  // Final JSON response
  res.status(statusCode).json({
    status: "error",
    message: err.message,
    ...(isDev && { stack: stackLines }),
  });
};
