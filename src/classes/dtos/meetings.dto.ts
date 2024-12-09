import { IMeeting } from '../../models/meeting.model';

export interface IMeetingDTO {
  id: string;
  serviceId: string;
  date: Date;
}

export const toMeetingResponse = (meeting: IMeeting): IMeetingDTO => {
  return {
    id: meeting._id,
    serviceId: meeting.serviceId,
    date: meeting.startDate,
  };
};
