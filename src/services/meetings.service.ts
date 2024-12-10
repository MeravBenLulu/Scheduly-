import mongoose from "mongoose";
import MeetingsRepository from "../repositories/meetings.repository";
import { IMeeting } from "../models/meeting.model";
import AppError, { ErrorConstants } from "../classes/AppError";
import servicesService from "./services.service";
import { IService } from "../models/service.model";
import { IMeetingDTO, toMeetingResponse } from "../classes/dtos/meetings.dto";

class MeetingsService {
  async get(): Promise<IMeeting[]> {
    const meetings: IMeeting[] | null = await MeetingsRepository.find();
    return meetings;
  }

  async getById(id: string): Promise<IMeeting> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.VALIDATION_ERROR);
    const meeting: IMeeting | null = await MeetingsRepository.findById(id);
    if (!meeting) throw new AppError(ErrorConstants.NOT_FOUND);
    return meeting;
  }

  //   async getByBusinessId(id: string): Promise<IMeeting[]> {
  //     const meetings: IMeeting[] | null = await MeetingsRepository.findBy({businessId:id});
  //     if (!meetings) throw new AppError(ErrorConstants.DATABASE_ERROR);
  //     return meetings;
  //   }

  async create(data: IMeetingDTO, userId: string): Promise<IMeetingDTO> {
    const { serviceId, date } = data;
    if (!serviceId || !date)
      throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    const startDate = new Date(date);
    if (isNaN(startDate.getTime())) throw new Error("Invalid date provided");
    const service: IService = await servicesService.getById(serviceId);
    const end: Date = new Date(startDate.getTime());
    end.setMinutes(end.getMinutes() + service.timeInMinutes);

    const meetings: IMeeting[] =
      await MeetingsRepository.findOverlappingMeetings(service.businessId, {
        startDate: startDate,
        endDate: end,
      });
    if (meetings.length > 0)
      throw new AppError(ErrorConstants.DATA_ALREADY_EXISTS);
    const meetingToCreate: Partial<IMeeting> = {
      serviceId: serviceId,
      businessId: service.businessId,
      startDate: startDate,
      endDate: end,
      userId: userId,
    };
    const res = await MeetingsRepository.create(meetingToCreate);
    return toMeetingResponse(res);
  }

  async update(id: string, date: Date): Promise<IMeetingDTO> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.VALIDATION_ERROR);
    const meeting = await MeetingsRepository.findById(id);
    if (!meeting) throw new AppError(ErrorConstants.NOT_FOUND);

    if (!(date instanceof Date) || isNaN(date.getTime()))
      throw new AppError(ErrorConstants.VALIDATION_ERROR);

    const differenceInMilliseconds =
      meeting.endDate.getTime() - meeting.startDate.getTime();
    const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
    const end = new Date(date.getDate());
    end.setMinutes(date.getMinutes() + differenceInMinutes);

    const meetings: IMeeting[] =
      await MeetingsRepository.findOverlappingMeetings(meeting.businessId, {
        startDate: date,
        endDate: end,
      });
    if (
      meetings.length > 1 ||
      (meetings.length == 1 && meetings[0]._id != meeting._id)
    )
      throw new AppError(ErrorConstants.DATA_ALREADY_EXISTS);

    const res: IMeeting | null = await MeetingsRepository.updateById(id, {
      startDate: date,
      endDate: end,
    });
    if (!res) throw new AppError(ErrorConstants.NOT_FOUND);
    return toMeetingResponse(res);
  }

  async delete(id: string): Promise<void> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.VALIDATION_ERROR);
    const Meeting = await MeetingsRepository.findById(id);
    if (!Meeting) throw new AppError(ErrorConstants.NOT_FOUND);
    await MeetingsRepository.deleteById(id);
    //TODO: add status parameter
  }

  async deleteByServiceId(id: string): Promise<void> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.VALIDATION_ERROR);
    await MeetingsRepository.delete({ serviceId: id });
  }

  async deleteByBusinessId(id: string): Promise<void> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.VALIDATION_ERROR);
    await MeetingsRepository.delete({ businessId: id });
  }
}
export default new MeetingsService();
