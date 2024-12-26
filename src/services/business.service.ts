import BusinessRepository from "../repositories/business.repository";
import { IBusiness } from "../models/business.model";
import AppError, { ErrorConstants } from "../classes/AppError";
import {
  IBusinessResponseDTO,
  toBusinessResponse,
} from "../classes/dtos/business.dto";
import mongoose from "mongoose";
import meetingsService from "./meetings.service";
import servicesService from "./services.service";
import { IService } from "models/service.model";

class BusinessService {
  async get(): Promise<IBusinessResponseDTO[]> {
    const businesses: IBusiness[] | null = await BusinessRepository.find();
    return businesses.map(toBusinessResponse);
  }

  async getById(id: string): Promise<IBusinessResponseDTO> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.VALIDATION_ERROR);
    const business: IBusiness | null = await BusinessRepository.findById(id);
    if (!business) throw new AppError(ErrorConstants.NOT_FOUND);
    return toBusinessResponse(business);
  }
  async getManagerIDById(id: string): Promise<string> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.VALIDATION_ERROR);
    const business: IBusiness | null = await BusinessRepository.findById(id);
    if (!business) throw new AppError(ErrorConstants.NOT_FOUND);
    return business.managerId;
  }

  async create(
    data: IBusinessResponseDTO,
    managerId: string,
  ): Promise<IBusiness> {
    const { name, description, address, email } = data;
    if (!name || !description || !email || !address)
      throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    const businesstoCreate: Partial<IBusiness> = {
      name: data.name,
      email: data.email,
      description: data.description,
      address: data.address,
      managerId: managerId,
      telephone: data.telephone ?? null,
    };
    //TODO:change userType from user to manager
    return await BusinessRepository.create(businesstoCreate);
  }

  async update(
    id: string,
    updates: Partial<IBusinessResponseDTO>,
  ): Promise<IBusinessResponseDTO> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.VALIDATION_ERROR);
    const business = await BusinessRepository.findById(id);
    if (!business) throw new AppError(ErrorConstants.NOT_FOUND);
    const res: IBusiness | null = await BusinessRepository.updateById(
      id,
      updates,
    );
    if (!res) throw new AppError(ErrorConstants.NOT_FOUND);
    return toBusinessResponse(res);
  }

  async delete(id: string): Promise<void> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.VALIDATION_ERROR);
    const business = await BusinessRepository.findById(id);
    if (!business) throw new AppError(ErrorConstants.NOT_FOUND);
    await BusinessRepository.deleteById(id);
    await servicesService.deleteByBusinessId(id);
    await meetingsService.deleteByBusinessId(id);
    //TODO: add status parameter
    //TODO: if this is the only one business of the user chnge user type from manager to user
  }
}

export default new BusinessService();
