import BusinessRepository from '../repositories/business.repository';
import { IBusiness } from '../models/business.model';
import AppError, { ErrorConstants } from '../classes/AppError';
import {
  IBusinessResponseDTO,
  toBusinessResponse,
} from '../classes/dtos/business.dto';
import mongoose from 'mongoose';

class BusinessService {
  async get(): Promise<IBusinessResponseDTO[]> {
    const businesses: IBusiness[] | null = await BusinessRepository.find();
    return businesses.map(toBusinessResponse);
  }

  async getById(id: string): Promise<IBusinessResponseDTO> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.NOT_FOUND);
    const business: IBusiness | null = await BusinessRepository.findById(id);
    if (!business) throw new AppError(ErrorConstants.NOT_FOUND);
    return toBusinessResponse(business);
  }

  async create(data: IBusiness): Promise<IBusiness> {
    const { name, description, address, email, managerId } = data;
    if (!name || !description || !email || !address || !managerId)
      throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    return await BusinessRepository.create(data);
  }

  async update(id: string, updates: Partial<IBusiness>): Promise<IBusiness> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.NOT_FOUND);
    const business = await BusinessRepository.findById(id);
    if (!business) throw new AppError(ErrorConstants.NOT_FOUND);
    return await BusinessRepository.updateById(id, updates);
  }

  async delete(id: string): Promise<void> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.NOT_FOUND);
    const business = await BusinessRepository.findById(id);
    if (!business) throw new AppError(ErrorConstants.NOT_FOUND);
    await BusinessRepository.deleteById(id);
  }
}

export default new BusinessService();
