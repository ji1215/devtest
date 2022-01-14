import * as express from 'express'
import { Request, Response } from 'express'
import { CompanyInsertParams } from '../../models/common/company';
import { service as companyService } from '../../service/common/companyService'

const router = express.Router();

// company 등록
router.post('/', async(req: Request<unknown, unknown, CompanyInsertParams, unknown>, res: Response) => {
  try {
    const params: CompanyInsertParams = {
      name : req.body.name, 
      code : req.body.code
    }

   // 비즈니스 로직 호출
    const result = await companyService.reg(params)
    return res.send('success')
  } catch (err) {
    return res.send('err')
  }
})

export { router };

