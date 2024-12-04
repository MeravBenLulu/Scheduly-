import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const logMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  //   logger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  logger.info('Request received', {
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString(),
  });
  res.on('finish', () => {
    if (res.statusCode == 200)
      logger.info('Response sent', {
        statusCode: res.statusCode,
        timestamp: new Date().toISOString(),
      });
  });
  next();
};

export default logMiddleware;
