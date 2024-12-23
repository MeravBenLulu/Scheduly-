import Service, { IService } from "../models/service.model";
import mongoose from "mongoose";
import AppError, { ErrorConstants } from "../classes/AppError";

class ServicesRepository {
  async find(parameters: any = {}): Promise<IService[]> {
    try {
      return await Service.find(parameters).lean<IService[]>();
    } catch (error) {
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }

  async findById(id: string): Promise<IService | null> {
    try {
      return await Service.findById(id).lean<IService>();
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new AppError(ErrorConstants.VALIDATION_ERROR);
      }
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }

  async create(ServiceData: Partial<IService>): Promise<IService> {
    try {
      const service = new Service(ServiceData);
      return await service.save();
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new AppError(ErrorConstants.VALIDATION_ERROR);
      }
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }

  async updateById(
    id: string,
    updates: Partial<IService>,
  ): Promise<IService | null> {
    try {
      return await Service.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true },
      ).lean<IService>();
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new AppError(ErrorConstants.VALIDATION_ERROR);
      }
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }

  async deleteById(id: string): Promise<IService | null> {
    try {
      return await Service.findByIdAndDelete(id);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new AppError(ErrorConstants.VALIDATION_ERROR);
      }
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }

  async delete(parameters: any): Promise<void> {
    try {
      if (!Object.keys(parameters).length)
        throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
      await Service.deleteMany(parameters);
    } catch (error) {
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }
}

export default new ServicesRepository();
