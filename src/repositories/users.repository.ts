import User, { IUser } from '../models/user.model';
import mongoose from 'mongoose';
import AppError, { ErrorConstants } from '../classes/AppError';

class UserRepository {
  async find(): Promise<IUser[]> {
    try {
      return await User.find().lean<IUser[]>();
    } catch (error) {
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }

  async findByName(name: string): Promise<IUser | null> {
    try {
      return await User.findOne({ name: name }).lean<IUser>();
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new AppError(ErrorConstants.VALIDATION_ERROR);
      }
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }
  async create(userData: IUser): Promise<IUser> {
    try {
      const business = new User(userData);
      return await business.save();
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new AppError(ErrorConstants.VALIDATION_ERROR);
      }
      if (error.code === 11000) {
        throw new AppError(ErrorConstants.DATA_ALREADY_EXISTS);
      }
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }
}
export default new UserRepository();
