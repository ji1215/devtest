import { InsertedResult } from "lib/resUtil";
import { CompanyAttributes, CompanyInsertParams } from "models/common/company";
import { dao as companyDao } from '../../dao/common/companyDao';

const service = {
  //insert
  async reg(params: CompanyInsertParams): Promise<InsertedResult> {
    let result: InsertedResult;

    // 사업장 등록
    try {
      result = await companyDao.insert(params)
      console.log('result : ', result)
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err)
      })
    }

    return new Promise((resolve) => {
      resolve(result)
    })
  }
};

export { service };



