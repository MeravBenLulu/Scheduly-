import { IBusiness } from '../models/business.model';
import businessService from '../services/business.service';
import servicesService from '../services/services.service';
import logger from '../utils/logger';
import AppError, { ErrorConstants } from './AppError';

class CheckPermission {
  async hasPermissionForBusiness(
    userId: string,
    businessId: string
  ): Promise<boolean> {
    const managerId: string =
      await businessService.getManagerIDById(businessId);
    return managerId == userId;
  }

  async hasPermissionForServices(
    userId: string,
    serviceId: string,
    businessId: string | null
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

  //   async   hasPermissionForMeeting = (userId: string, meetingId: string) => {
  //     const meeting = getById(meetingId);
  //     return hasPermissionForBusiness(userId, meeting.businessId); // אם המשתמש הוא מנהל של העסק שקשור לפגישה
  //   };
}
export default new CheckPermission();
