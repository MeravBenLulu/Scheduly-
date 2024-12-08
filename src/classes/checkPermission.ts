import { IBusiness } from '../models/business.model';
import businessService from '../services/business.service';
import logger from '../utils/logger';

class CheckPermission {
  async hasPermissionForBusiness(
    userId: string,
    businessId: string
  ): Promise<boolean> {
    const managerId: string =
      await businessService.getManagerIDById(businessId);
    logger.info('managerId: ' + managerId + ' userId: ' + userId);
    return managerId == userId;
  }

  //   async   hasPermissionForMeeting = (userId: string, meetingId: string) => {
  //     const meeting = getById(meetingId);
  //     return hasPermissionForBusiness(userId, meeting.businessId); // אם המשתמש הוא מנהל של העסק שקשור לפגישה
  //   };
}
export default new CheckPermission();
