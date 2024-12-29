import AppError, { ErrorConstants } from "../classes/AppError";
import { IOpeningHours } from "../models/business.model";

export const validateMeetingTime = async (
  openingHours: IOpeningHours[],
  startDate: Date,
  meetingDurationInMinutes: number,
): Promise<void> => {
  const dayOfWeek = startDate.toLocaleDateString("en-US", { weekday: "long" });

  const dayOpeningHours = openingHours.find((entry) => entry.day === dayOfWeek);
  if (!dayOpeningHours) {
    throw new AppError(ErrorConstants.VALIDATION_ERROR);
  }

  const { open, close } = dayOpeningHours;

  const openTime = parseInt(open.replace(":", ""), 10);
  const closeTime = parseInt(close.replace(":", ""), 10);
  const startTime = parseInt(
    startDate.toTimeString().slice(0, 5).replace(":", ""),
    10,
  );

  const endDate = new Date(startDate.getTime());
  endDate.setMinutes(endDate.getMinutes() + meetingDurationInMinutes);
  const endTime = parseInt(
    endDate.toTimeString().slice(0, 5).replace(":", ""),
    10,
  );

  if (startTime < openTime || endTime > closeTime) {
    throw new AppError(ErrorConstants.VALIDATION_ERROR);
  }
};
