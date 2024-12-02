export const ErrorConstants = {
  INVALID_CREDENTIALS: { message: 'Invalid credentials', statusCode: 404 },
  MISSING_REQUIRED_FIELDS: {
    message: 'Some required fields are missing',
    statusCode: 400,
  },
  DATA_ALREADY_EXISTS: { message: 'Data already exists', statusCode: 409 },
  UNAUTHORIZED: { message: 'Unauthorized access', statusCode: 403 },
  FORBIDDEN: { message: 'Forbidden action', statusCode: 403 },
  DATABASE_ERROR: { message: 'Database error occurred', statusCode: 500 },
  INTERNAL_SERVER_ERROR: { message: 'Internal server error', statusCode: 500 },
};

export default class AppError extends Error {
  statusCode: number;
  message: string;
  constructor(obj: { message: string; statusCode: number }) {
    super(obj.message);
    this.statusCode = obj.statusCode;
    this.message = obj.message;
    Error.captureStackTrace(this, this.constructor);
  }
}
