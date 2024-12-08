import Business, { IBusiness } from '../models/business.model';
import mongoose from 'mongoose';
import AppError, { ErrorConstants } from '../classes/AppError';

class BusinessRepository {
  async find(): Promise<IBusiness[]> {
    try {
      return await Business.find().lean<IBusiness[]>();
    } catch (error) {
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }

  async findById(id: string): Promise<IBusiness | null> {
    try {
      return await Business.findById(id).lean<IBusiness>();
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new AppError(ErrorConstants.VALIDATION_ERROR);
      }
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }

  async create(businessData: Partial<IBusiness>): Promise<IBusiness> {
    try {
      const business = new Business(businessData);
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

  async updateById(
    id: string,
    updates: Partial<IBusiness>
  ): Promise<IBusiness | null> {
    try {
      return await Business.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true }
      ).lean<IBusiness>();
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

  async deleteById(id: string): Promise<IBusiness | null> {
    try {
      return await Business.findByIdAndDelete(id);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new AppError(ErrorConstants.VALIDATION_ERROR);
      }
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }
}

export default new BusinessRepository();
