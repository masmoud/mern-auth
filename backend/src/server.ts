import http from "http";
import app from "./app";
import { connectDB, setupShutdownListeners } from "./config/db";
import { env } from "./config/env";
import { getErrorMessage } from "./utils/error-message";
import { logger } from "./utils/logger";

const startServer = async () => {
  try {
    // Wait for the database connection to complete
    await connectDB();

    // Setup shutdown listeners
    setupShutdownListeners();

    // Create the server
    const server = http.createServer(app);

    server.listen(env.PORT, () => {
      logger.info(`Server is running on http://localhost:${env.PORT}`);
      logger.info(`API Documentation: ${env.POSTMAN_API_DOCUMENTATION_URL}`);
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    logger.error(`Error starting the server: ${errorMessage} `);
    process.exit(1);
  }
};

startServer();
