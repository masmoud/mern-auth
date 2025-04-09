import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // Skip logging for /favicon.ico
  if (req.path === "/favicon.ico") return next();

  const logIncoming = () => {
    try {
      // Safely handle undefined or null for body and cookies
      const logData = {
        method: req.method,
        path: req.originalUrl,
        timestamp: new Date().toISOString(),
        body: req.body && typeof req.body === "object" ? req.body : {}, // Ensure body is an object
        cookies: req.cookies
          ? { ...req.cookies, accessToken: "[REDACTED]", refreshToken: "[REDACTED]" }
          : {},
      };

      // Logging incoming request
      logger.info(JSON.stringify(logData, null, 2));

      // Log detailed incoming request info
      const lines = [
        "Incoming Request",
        `method: ${req.method}`,
        `path: ${req.originalUrl}`,
        `timestamp: ${new Date().toISOString()}`,
        `body: ${JSON.stringify(req.body, null, 2)}`,
      ];

      // Log all lines
      logger.info(lines.join("\n"));
    } catch (error) {
      console.error("Logging error:", error);
      next(error); // Pass the error to the next middleware
    }
  };

  // Execute the logging for incoming request
  logIncoming();

  // Listen to the response finish event to log response info
  res.on("finish", () => {
    const duration = Date.now() - start;
    const resultLabel = res.statusCode >= 400 ? "Request Failed" : "Request Succeeded";
    const body = (res as any).__responseBody || {}; // Ensure response body is handled correctly

    // Prepare log lines for response
    const lines = [
      resultLabel,
      `method: ${req.method}`,
      `path: ${req.originalUrl}`,
      `status: ${res.statusCode}`,
      `responsetime: ${duration} ms`,
      `timestamp: ${new Date().toISOString()}`,
    ];

    // Log response body if present
    if (Object.keys(body).length > 0) {
      lines.push(`response: ${JSON.stringify(body)}`);
    }

    // Determine log level based on status code
    const level = res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "info";
    logger[level](lines.join("\n"));
  });

  next();
};

export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`${err.name}: ${err.message}`);
  next(err);
};
