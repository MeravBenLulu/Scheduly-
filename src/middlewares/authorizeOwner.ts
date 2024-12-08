import AppError, { ErrorConstants } from '../classes/AppError';
import { Request, Response, NextFunction } from 'express';
import checkPermission from '../classes/checkPermission';

export const authorizeBusinessOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const userIdFromToken = res.locals.user.userId;
    const result = await checkPermission.hasPermissionForBusiness(
      userIdFromToken,
      id
    );
    if (!result) throw new AppError(ErrorConstants.FORBIDDEN);
    next();
  } catch (error) {
    next(error);
  }
};
