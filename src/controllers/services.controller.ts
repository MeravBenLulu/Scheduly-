import { Request, Response, NextFunction } from 'express';
import ServicesService from '../services/services.service';
import { IService } from '../models/service.model';

class ServicesController {
  /**
   * @swagger
   * /Services:
   *   get:
   *     summary: Get all services
   *     description: Retrieve all services from the database.
   *     tags: [Services]
   *     responses:
   *       200:
   *         description: List of all services
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Service'
   *       500:
   *         description: Internal server error
   */
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const services: IService[] = await ServicesService.get();
      res.status(200).json(services);
    } catch (error) {
      next(error);
    }
  }
  /**
   * @swagger
   * /Services/{id}:
   *   get:
   *     summary: Get service by id
   *     description: Retrieve a specific service by its id.
   *     tags: [Services]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The id of the service.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: service found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Service'
   *       400:
   *         description: Some required fields are missing
   *       404:
   *         description: not found
   *       500:
   *         description: Internal server error
   */
  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const Services: IService = await ServicesService.getById(req.params.id);
      res.status(200).json(Services);
    } catch (error) {
      next(error);
    }
  }
  /**
   * @swagger
   * /Services:
   *   post:
   *     summary: Create a new service
   *     description: Add a new service to the system.
   *     tags: [Services]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - description
   *               - timeInMinutes
   *               - price
   *               - businessId
   *             properties:
   *               name:
   *                 type: string
   *                 description: The name of the Services
   *               description:
   *                 type: string
   *                 description: A description of the Services
   *               timeInMinutes:
   *                 type: number
   *                 description: haw match time the service is taking
   *               price:
   *                 type: number
   *                 description: price of the service
   *               businessId:
   *                 type: string
   *                 description: The id of of the business that offer this service
   *     responses:
   *       201:
   *         description: service created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Service'
   *       400:
   *         description: Some required fields are missing
   *       401:
   *         description: Unauthorized access
   *       409:
   *         description: Data already exists
   *       422:
   *         description: validation faild
   *       500:
   *         description: Internal server error
   */
  async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newServices: IService = await ServicesService.create(req.body);
      res.status(201).json({ success: true, data: newServices });
    } catch (error) {
      next(error);
    }
  }
  /**
   * @swagger
   * /Services/{id}:
   *   put:
   *     summary: Update service by id
   *     description: Update an existing Services by its id.
   *     tags: [Services]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The id of the service.
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
   *                 description: The updated name of the service
   *               description:
   *                 type: string
   *                 description: The updated description of the service
   *               timeInMinutes:
   *                 type: string
   *                 description: The updated timeInMinutes of the service
   *               price:
   *                 type: number
   *                 description: price of the service
   *     responses:
   *       200:
   *         description: service updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Service'
   *       400:
   *         description: Some required fields are missing
   *       401:
   *         description: Unauthorized access
   *       403:
   *         description: forbidden action
   *       404:
   *         description: not found
   *       409:
   *         description: Data already exists
   *       422:
   *         description: validation faild
   *       500:
   *         description: Internal server error
   */
  async put(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updatedServices: IService = await ServicesService.update(
        req.params.id,
        req.body
      );
      res.status(200).json({ success: true, data: updatedServices });
    } catch (error) {
      next(error);
    }
  }
  /**
   * @swagger
   * /Services/{id}:
   *   delete:
   *     summary: Delete a service by id
   *     description: Delete an existing service by its id.
   *     tags: [Services]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The id of the service to delete.
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: service deleted successfully
   *       400:
   *         description: Some required fields are missing
   *       401:
   *         description: Unauthorized access
   *       403:
   *         description: forbidden action
   *       404:
   *         description: not found
   *       500:
   *         description: Internal server error
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await ServicesService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
export default new ServicesController();
