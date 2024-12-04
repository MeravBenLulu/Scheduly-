import BusinessRepository from '../repositories/business.repository';
import { IBusiness } from '../models/business.model';
import AppError, { ErrorConstants } from '../classes/AppError';
import {
  BusinessResponseDTO,
  toBusinessResponse,
} from '../classes/dtos/business.dto';
import mongoose from 'mongoose';

class BusinessService {
  async getAllBusinesses(): Promise<BusinessResponseDTO[]> {
    const businesses: IBusiness[] | null = await BusinessRepository.findAll();
    return businesses.map(toBusinessResponse);
  }

  async getBusinessById(id: string): Promise<BusinessResponseDTO> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.NOT_FOUND);
    const business: IBusiness | null = await BusinessRepository.findById(id);
    if (!business) throw new AppError(ErrorConstants.NOT_FOUND);
    return toBusinessResponse(business);
  }

  async createBusiness(data: IBusiness): Promise<IBusiness> {
    const { name, description, address, email, managerId } = data;
    if (!name || !description || !email || !address || !managerId)
      throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    return await BusinessRepository.create(data);
  }

  async updateBusiness(
    id: string,
    updates: Partial<IBusiness>
  ): Promise<IBusiness> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.NOT_FOUND);
    const business = await BusinessRepository.findById(id);
    if (!business) throw new AppError(ErrorConstants.NOT_FOUND);
    return await BusinessRepository.updateById(id, updates);
  }

  async deleteBusiness(id: string): Promise<void> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.NOT_FOUND);
    const business = await BusinessRepository.findById(id);
    if (!business) throw new AppError(ErrorConstants.NOT_FOUND);
    await BusinessRepository.deleteById(id);
  }
}

export default new BusinessService();
