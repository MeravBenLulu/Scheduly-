import express, { Router } from 'express';
import businessApiFunctions from '../controllers/business.controller';

const app: Router = express.Router();

app.get('/:email', businessApiFunctions.getByEmail);
app.get('/', businessApiFunctions.get);
app.post('/', businessApiFunctions.post);
app.put('/:email', businessApiFunctions.put);
app.delete('/:email', businessApiFunctions.delete);

export default app;
