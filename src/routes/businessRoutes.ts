import express, { Router } from 'express';
import businessApiFunctions from '../controllers/businessController';
const app: Router = express.Router();

async function routers(): Promise<void> {
  app.get('/:email', businessApiFunctions.getByEmail);
  app.get('/', businessApiFunctions.get);
  app.post('/', businessApiFunctions.post);
  app.put('/:email', businessApiFunctions.put);
  app.delete('/:email', businessApiFunctions.delete);
}
routers();

export default app;
