import { Request, Response, NextFunction } from 'express';
import AppError, { ErrorConstants } from '../classes/AppError';
import Business, { IBusiness } from '../models/Business';

export default {
  /**
   * @swagger
   * /business:
   *   get:
   *     summary: Get all businesses
   *     description: Retrieve all businesses from the database.
   *     responses:
   *       200:
   *         description: List of all businesses
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Business'
   *       500:
   *         description: Internal server error
   */
  get: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const businesses = await Business.find();
      res.status(200).json(businesses);
    } catch (error) {
      next(new AppError(ErrorConstants.INTERNAL_SERVER_ERROR));
    }
  },

  /**
   * @swagger
   * /business/{email}:
   *   get:
   *     summary: Get business by email
   *     description: Retrieve a specific business by its email.
   *     parameters:
   *       - in: path
   *         name: email
   *         required: true
   *         description: The email of the business.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Business found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Business'
   *       400:
   *         description: Some required fields are missing
   *       404:
   *         description: Invalid credentials
   *       500:
   *         description: Internal server error
   */
  getByEmail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const email: string | null = req.params.email;
      if (!email)
        return next(new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS));
      const business = await Business.findOne({ email });
      if (!business) {
        return next(new AppError(ErrorConstants.INVALID_CREDENTIALS));
      }
      res.status(200).json(business);
    } catch (error) {
      next(new AppError(ErrorConstants.INTERNAL_SERVER_ERROR));
    }
  },

  /**
   * @swagger
   * /business:
   *   post:
   *     summary: Create a new business
   *     description: Add a new business to the system.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - description
   *               - email
   *               - address
   *             properties:
   *               name:
   *                 type: string
   *                 description: The name of the business
   *               description:
   *                 type: string
   *                 description: A description of the business
   *               email:
   *                 type: string
   *                 description: The email of the business
   *               telephone:
   *                 type: string
   *                 description: The telephone number of the business
   *               address:
   *                 type: string
   *                 description: The address of the business
   *     responses:
   *       201:
   *         description: Business created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Business'
   *       400:
   *         description: Some required fields are missing
   *       409:
   *         description: Data already exists
   *       500:
   *         description: Internal server error
   */
  post: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { name, description, email, telephone, address }: IBusiness =
        req.body;
      if (!name || !description || !email || !address)
        return next(new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS));
      const findBusiness = await Business.findOne({ email });
      if (findBusiness)
        return next(new AppError(ErrorConstants.DATA_ALREADY_EXISTS));
      const newBusiness = new Business({
        name,
        description,
        email,
        telephone,
        address,
      });
      const savedBusiness = await newBusiness.save();
      res.status(201).json({ success: true, data: savedBusiness });
    } catch (error) {
      next(new AppError(ErrorConstants.INTERNAL_SERVER_ERROR));
    }
  },

  /**
   * @swagger
   * /business/{email}:
   *   put:
   *     summary: Update business by email
   *     description: Update an existing business by its email.
   *     parameters:
   *       - in: path
   *         name: email
   *         required: true
   *         description: The email of the business.
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: The updated name of the business
   *               description:
   *                 type: string
   *                 description: The updated description of the business
   *               telephone:
   *                 type: string
   *                 description: The updated telephone of the business
   *               address:
   *                 type: string
   *                 description: The updated address of the business
   *     responses:
   *       200:
   *         description: Business updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Business'
   *       400:
   *         description: Some required fields are missing
   *       404:
   *         description: Invalid credentials
   *       500:
   *         description: Internal server error
   */
  put: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email } = req.params;
      if (!email)
        return next(new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS));
      const findBusiness = await Business.findOne({ email });
      if (!findBusiness)
        return next(new AppError(ErrorConstants.INVALID_CREDENTIALS));
      const { name, description, telephone, address }: IBusiness = req.body;
      const savedBusiness = await Business.findOneAndUpdate(
        { email: email },
        { $set: { name, description, telephone, address } },
        { new: true }
      );
      res.status(200).json({ success: true, data: savedBusiness });
    } catch (error) {
      next(new AppError(ErrorConstants.INTERNAL_SERVER_ERROR));
    }
  },

  /**
   * @swagger
   * /business/{email}:
   *   delete:
   *     summary: Delete a business by email
   *     description: Delete an existing business by its email.
   *     parameters:
   *       - in: path
   *         name: email
   *         required: true
   *         description: The email of the business to delete.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Business deleted successfully
   *       400:
   *         description: Some required fields are missing
   *       404:
   *         description: Invalid credentials
   *       500:
   *         description: Internal server error
   */
  delete: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email } = req.params;
      if (!email)
        return next(new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS));
      const findBusiness = await Business.findOne({ email });
      if (!findBusiness)
        return next(new AppError(ErrorConstants.INVALID_CREDENTIALS));
      const deletedBusiness = await Business.findOneAndDelete({ email });
      res.status(200).json({ success: true, data: deletedBusiness });
    } catch (error) {
      next(new AppError(ErrorConstants.INTERNAL_SERVER_ERROR));
    }
  },
};
