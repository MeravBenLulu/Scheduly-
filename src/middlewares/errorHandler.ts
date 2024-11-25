const express = require('express');
let app = express.Router();
import { Request, Response, NextFunction } from 'express';
import AppError from '../classes/AppError';

app.use((err: AppError, _req: Request, res: Response, _next: NextFunction) => {
    //TODO: write error to log
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
      },
    });
  });
export default app;
  