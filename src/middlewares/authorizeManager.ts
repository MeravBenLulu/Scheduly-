import { Request, Response, NextFunction } from "express";
import AppError, { ErrorConstants } from "../classes/AppError";

export const authorizeManager = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (res.locals.user.userRole != "manager")
      throw new AppError(ErrorConstants.FORBIDDEN);
    next();
  } catch (error) {
    next(error);
  }
};
