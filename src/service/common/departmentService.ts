import {
  InsertedResult,
  SelectedListResult,
  UpdatedResult,
  DeletedResult,
} from '../../lib/resUtil';
import {
  DepartmentAttributes, DepartmentInsertParams,
  DepartmentSelectListParams,
  // DepartmentSelectInfoParams,
  DepartmentUpdateParams,
  DepartmentDeleteParams,
} from 'models/common/department';
import { dao as departmentDao } from '../../dao/common/departmentDao';

const service = {
  //insert
  async reg(params: DepartmentInsertParams): Promise<InsertedResult> {
    let result: InsertedResult;

    // 부서 등록
    try {
      result = await departmentDao.insert(params);
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
  async list(params: DepartmentSelectListParams): Promise<SelectedListResult<DepartmentAttributes>> {
    let result: SelectedListResult<DepartmentAttributes>;

    try {
      result = await departmentDao.selectList(params);
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
  async edit(params: DepartmentUpdateParams): Promise<UpdatedResult> {
    let result: UpdatedResult;
    try {
      result = await departmentDao.update(params);
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
  async delete(params: DepartmentDeleteParams): Promise<DeletedResult> {
    let result: DeletedResult;

    try {
      result = await departmentDao.deleteForce(params);
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
};

export { service };
