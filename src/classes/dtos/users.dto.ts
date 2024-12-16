import { IUser } from "../../models/user.model";

export interface IUserResponseDTO {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const toUserResponse = (user: IUser): IUserResponseDTO => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};
