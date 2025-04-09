import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // Skip logging for /favicon.ico
  if (req.path === "/favicon.ico") return next();

  const ENABLE_PRETTY_LOG = true;
  const ENABLE_JSON_LOG = false; // Set to true if you prefer JSON logs

  // Filter and redact sensitive cookies
  const getFilteredCookies = (cookies: Record<string, string>) => {
    const allowedCookies = ["accessToken", "refreshToken"];
    return allowedCookies.reduce((acc, key) => {
      if (cookies?.[key]) acc[key] = "[REDACTED]";
      return acc;
    }, {} as Record<string, string>);
  };

  // Filter headers (e.g. remove Authorization)
  const getFilteredHeaders = (headers: Record<string, any>) => {
    const filtered = { ...headers };
    if (filtered.authorization) {
      filtered.authorization = "[REDACTED]";
    }
    return filtered;
  };

  // Mask password if it's a login or register route
  const sanitizeBody = (path: string, body: any) => {
    if (
      (path === "/api/auth/login" || path === "/api/auth/register") &&
      typeof body === "object" &&
      body?.password
    ) {
      return { ...body, password: "[REDACTED]" };
    }
    return body;
  };

  const logRequest = () => {
    try {
      const sanitizedBody = sanitizeBody(req.path, req.body);
      const logData = {
        method: req.method,
        path: req.originalUrl,
        timestamp: new Date().toISOString(),
        ip: req.ip,
        query: req.query,
        body: sanitizedBody,
        cookies: getFilteredCookies(req.cookies || {}),
        headers: getFilteredHeaders(req.headers),
      };

      if (ENABLE_JSON_LOG) {
        logger.info(JSON.stringify(logData, null, 2));
      }

      if (ENABLE_PRETTY_LOG) {
        const lines = [
          "Incoming Request",
          `method: ${logData.method}`,
          `path: ${logData.path}`,
          `timestamp: ${logData.timestamp}`,
          `ip: ${logData.ip}`,
          `query: ${JSON.stringify(logData.query, null, 2)}`,
          `body: ${JSON.stringify(logData.body, null, 2)}`,
        ];
        logger.info(lines.join("\n"));
      }
    } catch (error) {
      console.error("Logging error:", error);
      next(error);
    }
  };

  logRequest();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const resultLabel = res.statusCode >= 400 ? "Request Failed" : "Request Succeeded";
    const body = (res as any).__responseBody || {};

    const lines = [
      resultLabel,
      `method: ${req.method}`,
      `path: ${req.originalUrl}`,
      `status: ${res.statusCode}`,
      `responsetime: ${duration} ms`,
      `timestamp: ${new Date().toISOString()}`,
    ];

    if (Object.keys(body).length > 0) {
      lines.push(`response: ${JSON.stringify(body)}`);
    }

    const level = res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "info";
    logger[level](lines.join("\n"));
  });

  next();
};

export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`${err.name}: ${err.message}`);
  next(err);
};
