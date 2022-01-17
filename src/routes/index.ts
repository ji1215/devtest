import * as express from 'express';

//common
import { router as companyRouter } from './common/company';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello devtest');
});

//common
router.use('/companies', companyRouter);

export { router };
