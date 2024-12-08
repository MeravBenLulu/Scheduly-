import ServicesRepository from '../repositories/services.repository';
import { IService } from '../models/service.model';
import AppError, { ErrorConstants } from '../classes/AppError';
import mongoose from 'mongoose';

class ServicesService {
  async get(): Promise<IService[]> {
    const servicees: IService[] | null = await ServicesRepository.find();
    return servicees;
  }

  async getById(id: string): Promise<IService> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.NOT_FOUND);
    const service: IService | null = await ServicesRepository.findById(id);
    if (!service) throw new AppError(ErrorConstants.NOT_FOUND);
    return service;
  }
  async getBusinessIDById(id: string): Promise<string> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.NOT_FOUND);
    const service: IService | null = await ServicesRepository.findById(id);
    if (!service) throw new AppError(ErrorConstants.NOT_FOUND);
    return service.businessId;
  }

  async create(data: IService): Promise<IService> {
    const { name, description, timeInMinutes, businessId } = data;
    if (!name || !description || !businessId || timeInMinutes == undefined)
      throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (String(timeInMinutes) === '' || isNaN(Number(timeInMinutes)))
      throw new AppError(ErrorConstants.VALIDATION_ERROR);
    data.businessId = businessId;
    return await ServicesRepository.create(data);
  }

  async update(id: string, updates: Partial<IService>): Promise<IService> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.NOT_FOUND);
    if ('businessId' in updates) delete updates.businessId;
    if (
      'timeInMinutes' in updates &&
      (String(updates.timeInMinutes) === '' || isNaN(updates.timeInMinutes))
    )
      throw new AppError(ErrorConstants.VALIDATION_ERROR);
    // const service = await ServicesRepository.findById(id);
    // if (!service) throw new AppError(ErrorConstants.NOT_FOUND);
    const res: IService = await ServicesRepository.updateById(id, updates);
    return res;
  }

  async delete(id: string): Promise<void> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.NOT_FOUND);
    // const service = await ServicesRepository.findById(id);
    // if (!service) throw new AppError(ErrorConstants.NOT_FOUND);
    await ServicesRepository.deleteById(id);
    //TODO:  add status parameter
  }
}

export default new ServicesService();
