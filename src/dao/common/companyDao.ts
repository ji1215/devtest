import { Op, OrderItem } from 'sequelize';

import { InsertedResult } from '../../lib/resUtil';

import Company, { CompanyAttributes, CompanyInsertParams } from '../../models/common/company';

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
};

export { dao };
