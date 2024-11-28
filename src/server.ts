require('dotenv').config();
import express from 'express';
import businessRoutes from './routes/businessRoutes';
import bodyParser from 'body-parser';
import connectToDB from './utils/connectToDB';
import errorHandler from './middlewares/errorHandler';
connectToDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/business', businessRoutes);
// app.use('/api/services', require('./routes/servicesRoutes'));
// app.use('/api/meetings', require('./routes/meetingRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
