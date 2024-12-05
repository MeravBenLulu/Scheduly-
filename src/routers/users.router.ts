import express, { Router } from 'express';
import usersController from '../controllers/users.controller';

const app: Router = express.Router();

app.get('/users', usersController.get);
app.post('/sign-in', usersController.signIn);
app.post('/sign-up', usersController.signUp);

export default app;
