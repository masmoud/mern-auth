import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import path from "path";
import { errorHandler, notFound } from "./middlewares/error.middleware";
import { requestLogger } from "./middlewares/logger.middleware";
import routes from "./routes";
const app: Application = express();

// Middleware
app.use(express.static(path.join(__dirname, "../public")));

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(requestLogger);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/api", routes);

// Not Found Middleware
app.use(notFound);

// Error Handler
app.use(errorHandler);

export default app;
