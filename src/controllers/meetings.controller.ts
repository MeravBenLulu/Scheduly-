import { Request, Response, NextFunction } from "express";
import MeetingsService from "../services/meetings.service";
import { IMeeting } from "../models/meeting.model";
import { IMeetingDTO } from "../classes/dtos/meetings.dto";

class MeetingsController {
  /**
   * @swagger
   * /meetings:
   *   get:
   *     summary: Get all meetings
   *     description: Retrieve all meetings from the database.
   *     tags: [Meeting]
   *     responses:
   *       200:
   *         description: List of all meetings
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Meeting'
   *       500:
   *         description: Internal server error
   */
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const meetings: IMeeting[] = await MeetingsService.get();
      res.status(200).json(meetings);
    } catch (error) {
      next(error);
    }
  }
  /**
   * @swagger
   * /meetings/{id}:
   *   get:
   *     summary: Get meeting by id
   *     description: Retrieve a specific meeting by its id.
   *     tags: [Meeting]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The id of the meeting.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: meeting found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Meeting'
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
    next: NextFunction,
  ): Promise<void> {
    try {
      const meeting: IMeeting = await MeetingsService.getById(req.params.id);
      res.status(200).json(meeting);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /meetings/business/{businessId}:
   *   get:
   *     summary: Get meeting by business id
   *     description: Retrieve a specific meetings by its id.
   *     tags: [Meeting]
   *     parameters:
   *       - in: path
   *         name: businessId
   *         required: true
   *         description: The id of the business.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: meetings found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Meeting'
   *       400:
   *         description: Some required fields are missing
   *       404:
   *         description: not found
   *       500:
   *         description: Internal server error
   */
  async getByBusinessId(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const meetings: IMeeting[] = await MeetingsService.getByBusinessId(
        req.params.businessId,
      );
      res.status(200).json(meetings);
    } catch (error) {
      next(error);
    }
  }
  /**
   * @swagger
   * /meetings:
   *   post:
   *     summary: Create a new meeting
   *     description: Add a new meeting to the system.
   *     tags: [Meeting]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - serviceId
   *               - date
   *             properties:
   *               serviceId:
   *                 type: string
   *                 description: The id of the service
   *               date:
   *                 type: string
   *                 format: date-time
   *                 description: the date of the meeting
   *     responses:
   *       201:
   *         description: meeting created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/MeetingDTO'
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
      const newmeeting: IMeetingDTO = await MeetingsService.create(
        req.body,
        res.locals.user.userId,
      );
      res.status(201).json({ success: true, data: newmeeting });
    } catch (error) {
      next(error);
    }
  }
  /**
   * @swagger
   * /meetings/{id}:
   *   put:
   *     summary: Update meeting by id
   *     description: Update an existing meeting by its id.
   *     tags: [Meeting]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The id of the meeting.
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               date:
   *                 type: Date
   *                 description: The updated date of the meeting
   *     responses:
   *       200:
   *         description: meeting updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Meeting'
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
      const updatedmeeting: IMeetingDTO = await MeetingsService.update(
        req.params.id,
        req.body.date,
      );
      res.status(200).json({ success: true, data: updatedmeeting });
    } catch (error) {
      next(error);
    }
  }
  /**
   * @swagger
   * /meetings/{id}:
   *   delete:
   *     summary: Delete a meeting by id
   *     description: Delete an existing meeting by its id.
   *     tags: [Meeting]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The id of the meeting to delete.
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: meeting deleted successfully
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
      await MeetingsService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
export default new MeetingsController();
