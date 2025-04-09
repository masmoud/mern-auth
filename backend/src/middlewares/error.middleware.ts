import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Global Error Handler
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  const timestamp = new Date().toISOString();
  const isDev = process.env.NODE_ENV === "development";

  // Prepare the error stack lines (max 10)
  const stackLines = (err.stack || "")
    .split("\n")
    .map((line) => line.trim())
    .slice(0, 10);

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

  res.json({
    message: err.message,
    ...(isDev && { stack: err.stack }),
  });
};
