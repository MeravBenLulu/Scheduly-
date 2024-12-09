import express, { Router } from 'express';
import meetingsController from '../controllers/meetings.controller';
import { authenticateToken } from '../middlewares/authenticateToken';
const app: Router = express.Router();

app.get('/:id', meetingsController.getById);
app.get('/', meetingsController.get);
app.post('/', authenticateToken, meetingsController.post);
app.put('/:id', authenticateToken, meetingsController.put);
app.delete('/:id', authenticateToken, meetingsController.delete);

export default app;
