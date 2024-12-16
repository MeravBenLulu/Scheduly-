import { IBusiness } from "../models/business.model";
import businessService from "../services/business.service";
import servicesService from "../services/services.service";
import logger from "../utils/logger";
import AppError, { ErrorConstants } from "./AppError";

class CheckPermission {
  async hasPermissionForBusiness(
    userId: string,
    businessId: string,
  ): Promise<boolean> {
    const managerId: string =
      await businessService.getManagerIDById(businessId);
    return managerId == userId;
  }

  async hasPermissionForServices(
    userId: string,
    serviceId: string,
    businessId: string | null,
  ): Promise<boolean> {
    const findBusinessId: string =
      businessId || (await servicesService.getBusinessIDById(serviceId));
    if (!findBusinessId) throw new AppError(ErrorConstants.NOT_FOUND);
    const managerId: string =
      await businessService.getManagerIDById(findBusinessId);
    //if(!managerId)
    //TODO: check if manager exists
    return managerId == userId;
  }
}
export default new CheckPermission();
