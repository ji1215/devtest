import { Op, OrderItem } from 'sequelize';

import {
  InsertedResult,
  SelectedListResult,
  UpdatedResult,
} from '../../lib/resUtil';

import Company, {
  CompanyAttributes, CompanyInsertParams,
  CompanySelectListParams,
  CompanySelectListQuery,
  CompanySelectInfoParams,
  CompanyUpdateParams,
  CompanyDeleteParams,
} from '../../models/common/company';

const dao = {
  insert(params: CompanyInsertParams): Promise<InsertedResult> {
    return new Promise((resolve, reject) => {
      Company.create(params)
        .then((inserted) => {
          console.log('inserted : ', inserted);
          resolve({ insertedId: inserted.id });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  selectList(params: CompanySelectListParams): Promise<SelectedListResult<CompanyAttributes>> {
    // DB에 넘길 최종 쿼리 세팅
    const setQuery: CompanySelectListQuery = {};
    // 1. where조건 세팅
    if (params.name) {
      setQuery.where = {
        ...setQuery.where,
        name: { [Op.like]: `%${params.name}%` },
      };
    }
    if (params.code) {
      setQuery.where = {
        ...setQuery.where,
        code: params.code,
      };
    }

    return new Promise((resolve, reject) => {
      Company.findAndCountAll({
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
  selectInfo(params: CompanySelectInfoParams): Promise<CompanyAttributes | null> {
    return new Promise((resolve, reject) => {
      Company.findByPk(params.id, {
        include: [],
      })
        .then((selectedInfo) => {
          resolve(selectedInfo);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  update(params: CompanyUpdateParams): Promise<UpdatedResult> {
    return new Promise((resolve, reject) => {
      Company.update(params, { where: { id: params.id } })
        .then(([updated]) => {
          resolve({ updatedCount: updated });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export { dao };
