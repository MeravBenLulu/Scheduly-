import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error('Error occurred:', {
    message: err.message || 'No message',
    stack: err.stack || 'No stack',
    statusCode: err.statusCode || 500,
    timestamp: new Date().toISOString(),
  });
  res.status(err.statusCode || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
};

export default errorHandler;
