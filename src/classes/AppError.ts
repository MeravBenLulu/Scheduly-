export const ErrorConstants = {
  INVALID_CREDENTIALS: { message: 'Invalid credentials', statusCode: 401 },
  MISSING_REQUIRED_FIELDS: {
    message: 'Some required fields are missing',
    statusCode: 400,
  },
  VLIDATION_ERROR: { message: 'validation failed', statusCode: 422 },
  NOT_FOUND: { message: 'not found', statusCode: 404 },
  DATA_ALREADY_EXISTS: { message: 'Data already exists', statusCode: 409 },
  UNAUTHORIZED: { message: 'Unauthorized access', statusCode: 401 },
  FORBIDDEN: { message: 'Forbidden action', statusCode: 403 },
  DATABASE_ERROR: { message: 'Database error occurred', statusCode: 500 },
  INTERNAL_SERVER_ERROR: { message: 'Internal server error', statusCode: 500 },
  ENVIRONMENT_VERIABLE_IS_NOT_DEFINED: {
    message: 'Environment variable is not defined',
    statusCode: 500,
  },
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
