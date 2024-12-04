import { Request, Response, NextFunction } from 'express';
import BusinessService from '../services/business.service';

class BusinessController {
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
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const businesses = await BusinessService.getAllBusinesses();
      res.status(200).json(businesses);
    } catch (error) {
      next(error);
    }
  }
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
   *         description: not found
   *       500:
   *         description: Internal server error
   */
  async getByEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const business = await BusinessService.getBusinessByEmail(
        req.params.email
      );
      res.status(200).json(business);
    } catch (error) {
      next(error);
    }
  }
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
   *       422:
   *         description: validation faild
   *       500:
   *         description: Internal server error
   */
  async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newBusiness = await BusinessService.createBusiness(req.body);
      res.status(201).json({ success: true, data: newBusiness });
    } catch (error) {
      next(error);
    }
  }
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
   *       422:
   *         description: validation faild
   *       404:
   *         description: not found
   *       500:
   *         description: Internal server error
   */
  async put(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updatedBusiness = await BusinessService.updateBusiness(
        req.params.email,
        req.body
      );
      res.status(200).json({ success: true, data: updatedBusiness });
    } catch (error) {
      next(error);
    }
  }
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
   *         description: not found
   *       500:
   *         description: Internal server error
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await BusinessService.deleteBusiness(req.params.email);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
export default new BusinessController();
