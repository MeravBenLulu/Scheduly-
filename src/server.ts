require('dotenv').config();
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { swaggerUi, specs } from '../config/swagger';
import connectToDB from './utils/connectToDB';
import errorHandler from './middlewares/errorHandler';
import logMiddleware from './middlewares/logWriter';
import servicesRouter from './routers/services.router';
import businessRouter from './routers/business.router';
import usersRouter from './routers/users.router';
import meetingsRouter from './routers/meetings.router';

connectToDB();
const app: Application = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logMiddleware);
app.use('/business', businessRouter);
app.use('/services', servicesRouter);
app.use('/meetings', meetingsRouter);
app.use('/', usersRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
