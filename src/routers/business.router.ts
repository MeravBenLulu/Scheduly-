import express, { Router } from 'express';
import businessController from '../controllers/business.controller';

const app: Router = express.Router();

app.get('/:id', businessController.getById);
app.get('/', businessController.get);
app.post('/', businessController.post);
app.put('/:id', businessController.put);
app.delete('/:id', businessController.delete);

export default app;
