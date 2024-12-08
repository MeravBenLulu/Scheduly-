import express, { Router } from 'express';
import servicesController from '../controllers/services.controller';
import { authenticateToken } from '../middlewares/authenticateToken';
import {
  authorizeBusinessOwner,
  authorizeServicesOwner,
} from '../middlewares/authorizeOwner';
const app: Router = express.Router();

app.get('/:id', servicesController.getById);
app.get('/', servicesController.get);
app.post(
  '/',
  authenticateToken,
  authorizeServicesOwner,
  servicesController.post
);
app.put(
  '/:id',
  authenticateToken,
  authorizeServicesOwner,
  servicesController.put
);
app.delete(
  '/:id',
  authenticateToken,
  authorizeServicesOwner,
  servicesController.delete
);

export default app;
