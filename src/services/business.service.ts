import BusinessRepository from '../repositories/business.repository';
import { IBusiness } from '../models/business.model';
import AppError, { ErrorConstants } from '../classes/AppError';

class BusinessService {
  async getAllBusinesses(): Promise<IBusiness[]> {
    return await BusinessRepository.findAll();
  }

  async getBusinessByEmail(email: string): Promise<IBusiness> {
    if (!email) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    const business = await BusinessRepository.findByEmail(email);
    if (!business) throw new AppError(ErrorConstants.NOT_FOUND);
    return business;
  }

  async createBusiness(data: IBusiness): Promise<IBusiness> {
    const { name, description, address, email } = data;
    if (!name || !description || !email || !address) {
      throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    }
    const existingBusiness = await BusinessRepository.findByEmail(email);
    if (existingBusiness) {
      throw new AppError(ErrorConstants.DATA_ALREADY_EXISTS);
    }
    return await BusinessRepository.create(data);
  }

  async updateBusiness(
    email: string,
    updates: Partial<IBusiness>
  ): Promise<IBusiness> {
    if (!email) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    const business = await BusinessRepository.findByEmail(email);
    if (!business) throw new AppError(ErrorConstants.NOT_FOUND);
    return await BusinessRepository.updateByEmail(email, updates);
  }

  async deleteBusiness(email: string): Promise<void> {
    if (!email) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    const business = await BusinessRepository.findByEmail(email);
    if (!business) throw new AppError(ErrorConstants.NOT_FOUND);
    await BusinessRepository.deleteByEmail(email);
  }
}

export default new BusinessService();
