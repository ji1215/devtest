import { Op, OrderItem } from 'sequelize';
import {
  InsertedResult,
  SelectedListResult,
  UpdatedResult,
  DeletedResult,
} from '../../lib/resUtil';
import Department, {
  DepartmentAttributes, DepartmentInsertParams,
  DepartmentSelectListParams,
  DepartmentSelectListQuery,
  // DepartmentSelectInfoParams,
  DepartmentUpdateParams,
  DepartmentDeleteParams,
} from '../../models/common/department';

const dao = {
  insert(params: DepartmentInsertParams): Promise<InsertedResult> {
    return new Promise((resolve, reject) => {
      Department.create(params)
        .then((inserted) => {
          console.log('inserted : ', inserted);
          resolve({ insertedId: inserted.id });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  selectList(params: DepartmentSelectListParams): Promise<SelectedListResult<DepartmentAttributes>> {
    // DB에 넘길 최종 쿼리 세팅
    const setQuery: DepartmentSelectListQuery = {};
    // 1. where조건 세팅
    if (params.name) {
      setQuery.where = {
        ...setQuery.where,
        name: { [Op.like]: `%${params.name}%` },
      };
    }

    return new Promise((resolve, reject) => {
      Department.findAndCountAll({
        ...setQuery,
        attributes: { exclude: ['description'] }, // 해당 필드 제외
        distinct: true,
      })
        .then((selectedList) => {
          resolve(selectedList);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  update(params: DepartmentUpdateParams): Promise<UpdatedResult> {
    return new Promise((resolve, reject) => {
      Department.update(params, { where: { id: params.id } })
        .then(([updated]) => {
          resolve({ updatedCount: updated });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteForce(params: DepartmentDeleteParams): Promise<DeletedResult> {
    return new Promise((resolve, reject) => {
      Department.destroy({
        // 다음의 조건으로만 삭제 가능
        where: {
          id: params.id,
        },
        force: true,
      })
        .then((deleted) => {
          resolve({ deletedCount: deleted });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};


export { dao };
