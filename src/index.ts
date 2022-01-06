import express from 'express';
import * as dotenv from 'dotenv';

import { sequelize } from './models';

dotenv.config();

const app = express();
const port = Number(process.env.NODE_PORT || '3030');
const env = (process.env.NODE_ENV as 'production' | 'test' | 'development') || 'development';

app.set('port', port);

app.get('/', (req, res) => {
  res.send('Hello devetest');
});

app.listen(app.get('port'), () => {
  console.log(`server is running on ${port}`);
});

// sequelize sync 동작 (Table 자동 생성 옵션)
sequelize
  .sync({
    force: false,
  })
  .then(() => {
    console.log('Sequelize sync success');
  })
  .catch((err: Error) => {
    console.error(err);
  });
