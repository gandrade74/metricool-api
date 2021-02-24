import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import dotenv from 'dotenv';
import config from './config';
import errorHandling from './middlewares/errorHandling';

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

app.use('/', (req, res) => {
  res.send('ok');
});

app.listen(port, async () => {
  console.log(`Server listening on ${port}`);
});
