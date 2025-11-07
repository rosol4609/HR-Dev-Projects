import express from "express";
import bodyParser from "body-parser";
import { config as dotenvConfig } from "dotenv";
import sequelize from "./utils/database.js";
import cors from "cors";
import config from "./config/config.js";
import errorHandler from "./middleware/errorHandler.js";
import messageRoutes from "./routes/messageRoutes.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";

// Initialize environment variables
dotenvConfig();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);

app.use(errorHandler);

// Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "App running!" });
});

// Global Error Handling Middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ success: false, message: message, data: data });
});

// DB Connection
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(config.server.port, () => {
      console.log(`Server is running on port ${config.server.port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
