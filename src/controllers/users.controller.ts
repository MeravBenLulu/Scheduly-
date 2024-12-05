import { Request, Response, NextFunction } from 'express';
import UsersService from '../services/users.service';
import { IUserResponseDTO } from '../classes/dtos/users.dto';
import { IUser } from '../models/user.model';
class UsersController {
  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Get all users
   *     description: Retrieve all users from the database.
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: List of all users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/UserResponseDTO'
   *       500:
   *         description: Internal server error
   */
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const users: IUserResponseDTO[] = await UsersService.get();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
  /**
   * @swagger
   * /sign-in:
   *   post:
   *     summary: Get token by sign in by name and password
   *     description: Retrieve a jwt token for Authentication purpose.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - password
   *             properties:
   *               name:
   *                 type: string
   *                 description: The name of the user
   *               password:
   *                 type: string
   *                 description: The password of the user
   *     responses:
   *       200:
   *         description: user sign-in
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserResponseDTO'
   *       400:
   *         description: Some required fields are missing
   *       401:
   *         description: Invalid credentials
   *       500:
   *         description: Internal server error
   */
  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string = await UsersService.signIn(
        req.body.name,
        req.body.password
      );
      res.status(200).json({ success: true, data: { token } });
    } catch (error) {
      next(error);
    }
  }
  /**
   * @swagger
   * /sign-up:
   *   post:
   *     summary: Create a new user
   *     description: Add a new user to the system.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - password
   *               - email
   *             properties:
   *               name:
   *                 type: string
   *                 description: The name of the user
   *               password:
   *                 type: string
   *                 description: The password of the user
   *               email:
   *                 type: string
   *                 description: The email of the user
   *     responses:
   *       201:
   *         description: user created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserResponseDTO'
   *       400:
   *         description: Some required fields are missing
   *       409:
   *         description: Data already exists
   *       422:
   *         description: validation faild
   *       500:
   *         description: Internal server error
   */
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser: IUserResponseDTO = await UsersService.create(req.body);
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      next(error);
    }
  }
}
export default new UsersController();
