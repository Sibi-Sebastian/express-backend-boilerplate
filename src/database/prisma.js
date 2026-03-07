// src/database/prisma.js

import { PrismaClient } from "@prisma/client";
import { config } from "../config/env";

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      config.env === "development"
        ? ["query", "info", "warn", "error"]
        : ["error"],
  });

if (config.env !== "production") {
  globalForPrisma.prisma = prisma;
}

// import { prisma } from "../../database/prisma.js";

// const user = await prisma.user.findUnique({
//   where: { email }
// });