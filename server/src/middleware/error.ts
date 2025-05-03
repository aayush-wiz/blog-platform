import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    status: err.status || 500,
  });

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};
