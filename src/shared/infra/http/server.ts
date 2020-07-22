import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors);
app.use(routes);

app.listen(3434, () => {
  // eslint-disable-next-line no-console
  console.log('[SERVER] Running on: http://localhost:3434');
});
