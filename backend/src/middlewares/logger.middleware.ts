import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  if (req.path === "/favicon.ico") return next();

  const ENABLE_JSON_LOG = false;
  const timestamp = new Date().toISOString();

  const redactCookies = (cookies: Record<string, string>) => {
    const allowed = ["accessToken", "refreshToken"];
    return Object.fromEntries(
      Object.entries(cookies || {}).map(([k, v]) =>
        allowed.includes(k) ? [k, "[REDACTED]"] : [k, v]
      )
    );
  };

  const redactHeaders = (headers: Record<string, any>) => {
    const redacted = { ...headers };
    if (redacted.authorization) redacted.authorization = "[REDACTED]";
    return redacted;
  };

  const sanitizeBody = (path: string, body: any) => {
    if (["/api/auth/login", "/api/auth/register"].includes(path) && body?.password) {
      return { ...body, password: "[REDACTED]" };
    }
    return body;
  };

  const logData = {
    method: req.method,
    path: req.originalUrl,
    timestamp,
    ip: req.ip,
    query: req.query,
    body: sanitizeBody(req.path, req.body),
    cookies: redactCookies(req.cookies),
    headers: redactHeaders(req.headers),
  };

  if (ENABLE_JSON_LOG) {
    logger.info(`[Request] ${JSON.stringify(logData, null, 2)}`);
  } else {
    logger.info(
      [
        "[Request]",
        `method: ${logData.method}`,
        `path: ${logData.path}`,
        `timestamp: ${logData.timestamp}`,
        `query: ${JSON.stringify(logData.query, null, 2)}`,
        `body: ${JSON.stringify(logData.body, null, 2)}`,
      ].join("\n")
    );
  }

  // Capture response
  const originalSend = res.send;
  res.send = function (body) {
    (res as any).__responseBody = body;
    return originalSend.call(this, body);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;

    // Skip logging here for server errors (handled by errorLogger)
    if (status >= 500) return;

    const result = status >= 400 ? "Failed" : "Succeeded";
    const level = status >= 400 ? "warn" : "info";

    logger[level](
      [
        `[Response] ${result}`,
        `method: ${req.method}`,
        `path: ${req.originalUrl}`,
        `status: ${status}`,
        `duration: ${duration} ms`,
        `timestamp: ${timestamp}`,
      ].join("\n")
    );
  });

  next();
};

export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(
    [
      "[Error]",
      `message: ${err.message}`,
      `stack: ${(err.stack || "").split("\n").slice(0, 3).join("\n")}`,
      `method: ${req.method}`,
      `path: ${req.originalUrl}`,
      `status: ${res.statusCode}`,
      `timestamp: ${new Date().toISOString()}`,
    ].join("\n")
  );
  next(err);
};
