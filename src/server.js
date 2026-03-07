process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
  process.exit(1);
});

import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { config } from "./config/env.js";

const port = config.port;

const server = app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);

  server.close(() => {
    process.exit(1);
  });
});

const shutdown = (signal) => {
  console.log(`${signal} received. Shutting down gracefully.`);

  server.close(() => {
    console.log("Process terminated");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);