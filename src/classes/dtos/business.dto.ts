import { IBusiness } from '../../models/business.model';

export interface IBusinessResponseDTO {
  id: string;
  name: string;
  description: string;
  email: string;
  telephone: string;
  address: string;
}

export const toBusinessResponse = (
  business: IBusiness
): IBusinessResponseDTO => {
  return {
    id: business._id,
    name: business.name,
    description: business.description,
    email: business.email,
    telephone: business.telephone,
    address: business.address,
  };
};
