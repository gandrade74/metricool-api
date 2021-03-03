import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import dotenv from 'dotenv';
import config from './config';
import errorHandling from './middlewares/errorHandling';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

dotenv.config();

const app = express();
const { port } = config;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(errorHandling.syntaxError);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/dashboards', dashboardRoutes);

app.listen(port, async () => {
  console.log(`Server listening on ${port}`);
});
