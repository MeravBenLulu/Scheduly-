import ServicesRepository from "../repositories/services.repository";
import { IService } from "../models/service.model";
import AppError, { ErrorConstants } from "../classes/AppError";
import mongoose from "mongoose";
import meetingsService from "./meetings.service";

class ServicesService {
  async get(): Promise<IService[]> {
    const servicees: IService[] | null = await ServicesRepository.find();
    return servicees;
  }

  async getById(id: string): Promise<IService> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.VALIDATION_ERROR);
    const service: IService | null = await ServicesRepository.findById(id);
    if (!service) throw new AppError(ErrorConstants.NOT_FOUND);
    return service;
  }
  async getBusinessIDById(id: string): Promise<string> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.VALIDATION_ERROR);
    const service: IService | null = await ServicesRepository.findById(id);
    if (!service) throw new AppError(ErrorConstants.NOT_FOUND);
    return service.businessId;
  }

  async create(data: IService): Promise<IService> {
    const { name, description, timeInMinutes, businessId, price } = data;
    if (
      !name ||
      !description ||
      !businessId ||
      price == undefined ||
      timeInMinutes == undefined
    )
      throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (
      String(timeInMinutes) === "" ||
      isNaN(Number(timeInMinutes)) ||
      String(price) === "" ||
      isNaN(Number(price))
    )
      throw new AppError(ErrorConstants.VALIDATION_ERROR);
    data.businessId = businessId;
    return await ServicesRepository.create(data);
  }

  async update(id: string, updates: Partial<IService>): Promise<IService> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.VALIDATION_ERROR);
    if ("businessId" in updates) delete updates.businessId;
    if (
      ("timeInMinutes" in updates &&
        (updates.timeInMinutes === null ||
          updates.timeInMinutes === undefined ||
          String(updates.timeInMinutes).trim() === "" ||
          isNaN(Number(updates.timeInMinutes)))) ||
      ("price" in updates &&
        (updates.price === null ||
          updates.price === undefined ||
          String(updates.price).trim() === "" ||
          isNaN(Number(updates.price))))
    )
      throw new AppError(ErrorConstants.VALIDATION_ERROR);
    // const service = await ServicesRepository.findById(id);
    // if (!service) throw new AppError(ErrorConstants.NOT_FOUND);
    const res: IService | null = await ServicesRepository.updateById(
      id,
      updates,
    );
    if (!res) throw new AppError(ErrorConstants.NOT_FOUND);
    return res;
  }

  async delete(id: string): Promise<void> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.VALIDATION_ERROR);
    // const service = await ServicesRepository.findById(id);
    // if (!service) throw new AppError(ErrorConstants.NOT_FOUND);
    await ServicesRepository.deleteById(id);
    await meetingsService.deleteByServiceId(id);
    //TODO:  add status parameter
  }

  async deleteByBusinessId(id: string): Promise<void> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.VALIDATION_ERROR);
    await ServicesRepository.delete({ businessId: id });
  }
}

export default new ServicesService();
