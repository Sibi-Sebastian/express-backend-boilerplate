import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import { config } from "../config/env.js";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new AppError("Authorization header missing", 401));
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return next(new AppError("Invalid authorization format", 401));
    }

    const token = parts[1];

    const decoded = jwt.verify(token, config.secret);

    req.user = decoded;

    next();
  } catch (error) {
    next(new AppError("Invalid or expired token", 401));
  }
};

export default authMiddleware;