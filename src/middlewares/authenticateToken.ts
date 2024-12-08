import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AppError, { ErrorConstants } from '../classes/AppError';

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token =
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'] ||
      req.headers['authorization']?.split(' ').pop();
    if (!token) throw new AppError(ErrorConstants.UNAUTHORIZED);
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey)
      throw new AppError(ErrorConstants.ENVIRONMENT_VERIABLE_IS_NOT_DEFINED);
    const decoded = jwt.verify(token, secretKey);
    res.locals.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
