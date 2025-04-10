import dotenv from "dotenv";
import path from "path";
import { logger } from "../utils/logger";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const env = {
  NODE_ENV: (process.env.NODE_ENV as string) || "development",
  PORT: parseInt(process.env.PORT as string) || 5000,
  CLIENT_URL: (process.env.CLIENT_URL as string) || "http://localhost:5173",
  MONGO_URI: (process.env.MONGO_URI as string) || "",
  ACCESS_TOKEN_SECRET: (process.env.ACCESS_TOKEN_SECRET as string) || "default_secret",
  REFRESH_TOKEN_SECRET: (process.env.REFRESH_TOKEN_SECRET as string) || "default_secret",
  ACCESS_TOKEN_EXPIRES_IN: parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN as string) || 900,
  REFRESH_TOKEN_EXPIRES_IN: parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN as string) || 86400000,
  SERVER_URL: (process.env.SERVER_URL as string) || "http://localhost:5000",
};

// Production-specific checks for missing important environment variables
if (env.NODE_ENV === "production") {
  if (!env.ACCESS_TOKEN_SECRET || !env.REFRESH_TOKEN_SECRET) {
    logger.error("Error: Missing required secrets in production environment.");
    process.exit(1);
  }

  if (!env.MONGO_URI) {
    logger.error("Error: Missing MongoDB URI in production environment.");
    process.exit(1);
  }
} else {
  if (!env.ACCESS_TOKEN_SECRET) {
    logger.warn("Warning: Access token secret not provided. Default secret is used.");
  }
  if (!env.REFRESH_TOKEN_SECRET) {
    logger.warn("Warning: Refresh token secret not provided. Default secret is used.");
  }
}
