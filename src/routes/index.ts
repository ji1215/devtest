import * as express from 'express';
import fs from 'fs';
import path from 'path';

//common
import { router as companyRouter } from './common/company';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    interface PackageJson {
      version: string;
      [key: string]: string;
    }

    const filePath = path.join(__dirname, '../../package.json');

    let version = '';
    fs.readFile(filePath, 'utf8', (_err, jsonFile) => {
      const jsonData: PackageJson = JSON.parse(jsonFile);
      version = jsonData.version;

      res.send(`DEVTEST (version: ${version})`);
    });
  } catch (err) {
    res.send(`DEVTEST`);
  }
});

//common
router.use('/companies', companyRouter);

export { router };
