import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "../utils/logger";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error(`Failed to connect to MongoDB: ${error}`);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
  logger.info("✅ Disconnected from MongoDB");
};

export const gracefulDisconnect = async () => {
  try {
    await disconnectDB();
    logger.info("Gracefully disconnected from MongoDB");
  } catch (error) {
    logger.error(`Failed to gracefully disconnect from MongoDB: ${error}`);
    throw error;
  }
};

export const handleShutdown = async (signal: string) => {
  logger.info(`Received ${signal}, shutting down...`);
  await gracefulDisconnect();
  process.exit(0);
};

export const setupShutdownListeners = () => {
  process.on("SIGINT", () => handleShutdown("SIGINT"));
  process.on("SIGTERM", () => handleShutdown("SIGTERM"));
  process.on("SIGQUIT", () => handleShutdown("SIGQUIT"));
};
