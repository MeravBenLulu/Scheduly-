import Business, { IBusiness } from '../models/business.model';
import mongoose from 'mongoose';
import AppError, { ErrorConstants } from '../classes/AppError';

class BusinessRepository {
  async findAll(): Promise<IBusiness[]> {
    try {
      return await Business.find().lean<IBusiness[]>();
    } catch (error) {
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }

  async findByEmail(email: string): Promise<IBusiness | null> {
    try {
      return await Business.findOne({ email }).lean<IBusiness>();
    } catch (error) {
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }

  async create(businessData: IBusiness): Promise<IBusiness> {
    try {
      const business = new Business(businessData);
      return await business.save();
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new AppError(ErrorConstants.VLIDATION_ERROR);
      }
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }

  async updateByEmail(
    email: string,
    updates: Partial<IBusiness>
  ): Promise<IBusiness | null> {
    try {
      return await Business.findOneAndUpdate(
        { email },
        { $set: updates },
        { new: true }
      ).lean<IBusiness>();
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new AppError(ErrorConstants.VLIDATION_ERROR);
      }
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }

  async deleteByEmail(email: string): Promise<IBusiness | null> {
    try {
      return await Business.findOneAndDelete({ email });
    } catch (error) {
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }
}

export default new BusinessRepository();
