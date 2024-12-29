import AppError, { ErrorConstants } from "../classes/AppError";
import { IOpeningHours } from "../models/business.model";

export const validateOpeningHours = async (
  openingHours: IOpeningHours[],
): Promise<void> => {
  const validDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  const daySet = new Set();

  for (const entry of openingHours) {
    const { day, open, close } = entry;

    if (!validDays.includes(day))
      throw new AppError(ErrorConstants.VALIDATION_ERROR);

    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(open) || !timeRegex.test(close))
      throw new AppError(ErrorConstants.VALIDATION_ERROR);

    const openTime = parseInt(open.replace(":", ""), 10);
    const closeTime = parseInt(close.replace(":", ""), 10);
    if (openTime >= closeTime)
      throw new AppError(ErrorConstants.VALIDATION_ERROR);

    if (daySet.has(day)) throw new AppError(ErrorConstants.VALIDATION_ERROR);

    daySet.add(day);
  }
};
