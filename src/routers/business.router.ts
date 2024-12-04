import express, { Router } from 'express';
import businessApiFunctions from '../controllers/business.controller';

const app: Router = express.Router();
app.use(express.json());
app.get('/:id', businessApiFunctions.getById);
app.get('/', businessApiFunctions.get);
app.post('/', businessApiFunctions.post);
app.put('/:id', businessApiFunctions.put);
app.delete('/:id', businessApiFunctions.delete);

export default app;
