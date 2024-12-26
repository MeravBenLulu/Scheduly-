import Meeting, { IMeeting } from "../models/meeting.model";
import mongoose from "mongoose";
import AppError, { ErrorConstants } from "../classes/AppError";

class MeetingsRepository {
  async find(parameters: any = {}): Promise<IMeeting[]> {
    try {
      return await Meeting.find(parameters).lean<IMeeting[]>();
    } catch (error) {
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }

  async findById(id: string): Promise<IMeeting | null> {
    try {
      return await Meeting.findById(id).lean<IMeeting>();
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new AppError(ErrorConstants.VALIDATION_ERROR);
      }
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }
  async findOverlappingMeetings(
    businessId: string,
    dates: { startDate: Date; endDate: Date },
  ): Promise<IMeeting[]> {
    const res: IMeeting[] = await Meeting.find({
      businessId: businessId,
      $or: [
        { startDate: { $lt: dates.endDate, $gte: dates.startDate } },
        { endDate: { $gt: dates.startDate, $lte: dates.endDate } },
        {
          startDate: { $lte: dates.startDate },
          endDate: { $gte: dates.endDate },
        },
      ],
    });
    return res;
  }

  async create(MeetingData: Partial<IMeeting>): Promise<IMeeting> {
    try {
      const meeting = new Meeting(MeetingData);
      return await meeting.save();
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new AppError(ErrorConstants.VALIDATION_ERROR);
      }
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }

  async updateById(
    id: string,
    updates: Partial<IMeeting>,
  ): Promise<IMeeting | null> {
    try {
      return await Meeting.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true },
      ).lean<IMeeting>();
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new AppError(ErrorConstants.VALIDATION_ERROR);
      }
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }

  async deleteById(id: string): Promise<IMeeting | null> {
    try {
      return await Meeting.findByIdAndDelete(id);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new AppError(ErrorConstants.VALIDATION_ERROR);
      }
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }

  async delete(parameters: any): Promise<void> {
    try {
      if (!Object.keys(parameters).length)
        throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
      await Meeting.deleteMany(parameters);
    } catch (error) {
      throw new AppError(ErrorConstants.DATABASE_ERROR);
    }
  }
}

export default new MeetingsRepository();
