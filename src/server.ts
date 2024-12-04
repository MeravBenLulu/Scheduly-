require('dotenv').config();
import express, { Application } from 'express';
import businessRoutes from './routers/business.router';
import bodyParser from 'body-parser';
import connectToDB from './utils/connectToDB';
import errorHandler from './middlewares/errorHandler';
import logMiddleware from './middlewares/logWriter';
import { swaggerUi, specs } from '../config/swagger';

connectToDB();
const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logMiddleware);
app.use('/business', businessRoutes);
// app.use('/api/services', require('./routes/servicesRoutes'));
// app.use('/api/meetings', require('./routes/meetingRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
