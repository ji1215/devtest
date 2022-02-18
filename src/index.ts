import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import hpp from 'hpp';
import helmet from 'helmet';

import { sequelize } from './models';
import { router } from './routes/index';

dotenv.config();

const app = express();

const port = Number(process.env.NODE_PORT || '3030');
const env = (process.env.NODE_ENV as 'production' | 'test' | 'development') || 'development';

app.set('port', port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.send('404 error: File not found');
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

