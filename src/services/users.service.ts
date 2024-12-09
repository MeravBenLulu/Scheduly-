import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import usersRepository from '../repositories/users.repository';
import { IUser } from '../models/user.model';
import AppError, { ErrorConstants } from '../classes/AppError';
import { toUserResponse, IUserResponseDTO } from '../classes/dtos/users.dto';
class UsersService {
  async get(): Promise<IUserResponseDTO[]> {
    const businesses: IUser[] | null = await usersRepository.find();
    return businesses.map(toUserResponse);
  }

  async signIn(name: string, password: string): Promise<string> {
    if (!name || !password)
      throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    const user: IUser = await usersRepository.findByName(name);
    if (!user) throw new AppError(ErrorConstants.INVALID_CREDENTIALS);
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid)
      throw new AppError(ErrorConstants.INVALID_CREDENTIALS);
    const token = await jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '5h' }
    );
    return token;
  }
  async create(userData: IUser): Promise<IUserResponseDTO> {
    const { password, email, name } = userData;
    if (!password || !email || !name)
      throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    const hashedPassword = await bcryptjs.hash(userData.password, 10);
    userData.password = hashedPassword;
    const newUser = await usersRepository.create(userData);
    return toUserResponse(newUser);
  }
}
export default new UsersService();
