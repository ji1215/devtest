import {
  InsertedResult,
  SelectedListResult,
  UpdatedResult,
  DeletedResult,
} from '../../lib/resUtil';
import {
  CompanyAttributes, CompanyInsertParams,
  CompanySelectListParams,
  CompanySelectInfoParams,
  CompanyUpdateParams,
  CompanyDeleteParams,
} from 'models/common/company';
import { dao as companyDao } from '../../dao/common/companyDao';

const service = {
  //insert
  async reg(params: CompanyInsertParams): Promise<InsertedResult> {
    let result: InsertedResult;

    // 사업장 등록
    try {
      result = await companyDao.insert(params);
      console.log('result : ', result);
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // selectList
  async list(params: CompanySelectListParams): Promise<SelectedListResult<CompanyAttributes>> {
    let result: SelectedListResult<CompanyAttributes>;

    try {
      result = await companyDao.selectList(params);
    } catch (err) {

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // selectInfo
  async info(params: CompanySelectInfoParams): Promise<CompanyAttributes | null> {
    let result: CompanyAttributes | null;

    try {
      result = await companyDao.selectInfo(params);
    } catch (err) {

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // update
  async edit(params: CompanyUpdateParams): Promise<UpdatedResult> {
    let result: UpdatedResult;

    // 1. 사업장 정보 수정
    try {
      result = await companyDao.update(params);
    } catch (err) {

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // delete
};


export { service };
