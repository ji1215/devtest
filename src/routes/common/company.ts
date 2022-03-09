/* eslint-disable @typescript-eslint/no-misused-promises */
import * as express from 'express';
import { Request, Response } from 'express';
import {
  responseCode as resCode,
  makeResponseSuccess as resSuccess,
  responseType as resType,
  makeResponseError as resError,
  ErrorClass,
} from '../../lib/resUtil';
import {
  CompanyInsertParams,
  CompanySelectListParams,
  CompanySelectInfoParams,
  CompanyUpdateParams,
  CompanyDeleteParams,
} from '../../models/common/company';
import { service as companyService } from '../../service/common/companyService';

const router = express.Router();

// company 등록
router.post('/', async (req: Request<unknown, unknown, CompanyInsertParams, unknown>, res: Response) => {
  try {
    const params: CompanyInsertParams = {
      name: req.body.name,
      code: req.body.code,
      registrationNumber: req.body.registrationNumber,
      corporationNumber: req.body.corporationNumber,
      ceoName: req.body.ceoName,
      businessType: req.body.businessType,
      businessItem: req.body.businessItem,
      phone: req.body.phone,
      email: req.body.email,
      homepage: req.body.homepage,
      zipCode: req.body.zipCode,
      address: req.body.address,
      tags: req.body.tags,
      userId: req.body.userId,
      description: req.body.description,
    };

    // 비즈니스 로직 호출
    const result = await companyService.reg(params);

    // 최종 응답 값 세팅
    const resJson = resSuccess(result, resType.REG);
    return res.status(resJson.status).json(resJson);

  } catch (err) {
    // 에러 응답 값 세팅
    const resJson = resError(err);
    return res.status(resJson.status).json(resJson);
  }
});

// company 리스트 조회
router.get('/', async (req: Request<unknown, unknown, unknown, CompanySelectListParams>, res: Response) => {
  try {
    // 요청 파라미터
    const params: CompanySelectListParams = {
      name: req.query.name,
      code: req.query.code,
      registrationNumber: req.query.registrationNumber,
      corporationNumber: req.query.corporationNumber,
      tags: req.query.tags ? ((req.query.tags as unknown) as string).split(',') : null,
      userId: Number(req.query.userId),
      limit: Number(req.query.limit || 'NaN'),
      offset: Number(req.query.offset || 'NaN'),
      order: req.query.order,
    };

    // 비즈니스 로직 호출
    const result = await companyService.list(params);

    // 최종 응답 값 세팅
    const resJson = resSuccess(result, resType.LIST);

    return res.status(resJson.status).json(resJson);
  } catch (err) {
    // 에러 응답 값 세팅
    const resJson = resError(err);

    return res.status(resJson.status).json(resJson);
  }
});
// company 상세정보 조회
router.get('/id/:id', async (req: Request<CompanySelectInfoParams, unknown, unknown, unknown>, res: Response) => {
  try {
    // 요청 파라미터
    const params: CompanySelectInfoParams = {
      id: Number(req.params.id),
    };

    // 입력 값 체크
    if (!params.id || isNaN(params.id)) {
      const err = new ErrorClass(resCode.BAD_REQUEST_INVALID, 'Invalid value (id: number)');

      const resJson = resError(err);

      return res.status(resJson.status).json(resJson);
    }

    // 비즈니스 로직 호출
    const result = await companyService.info(params);

    // 최종 응답 값 세팅
    const resJson = resSuccess(result, resType.INFO);

    return res.status(resJson.status).json(resJson);
  } catch (err) {
    // 에러 응답 값 세팅
    const resJson = resError(err);

    return res.status(resJson.status).json(resJson);
  }
});

// company 정보 수정
router.put('/id/:id', async (req: Request<CompanyUpdateParams, unknown, CompanyUpdateParams, unknown>, res: Response) => {
  try {
    // 요청 파라미터
    const params: CompanyUpdateParams = {
      id: Number(req.params.id),
      name: req.body.name,
      code: req.body.code,
      registrationNumber: req.body.registrationNumber,
      corporationNumber: req.body.corporationNumber,
      ceoName: req.body.ceoName,
      businessType: req.body.businessType,
      businessItem: req.body.businessItem,
      phone: req.body.phone,
      email: req.body.email,
      homepage: req.body.homepage,
      zipCode: req.body.zipCode,
      address: req.body.address,
      tags: req.body.tags,
      userId: req.body.userId,
      description: req.body.description
    };

    // 비즈니스 로직 호출
    const result = await companyService.edit(params);

    // 최종 응답 값 세팅
    const resJson = resSuccess(result, resType.EDIT);

    return res.status(resJson.status).json(resJson);
  } catch (err) {
    // 에러 응답 값 세팅
    const resJson = resError(err);

    return res.status(resJson.status).json(resJson);
  }
});

// company 삭제
router.delete(
  '/id/:id',
  async (req: Request<CompanyDeleteParams, unknown, unknown, unknown>, res: Response) => {
    try {
      // 요청 파라미터
      const params: CompanyDeleteParams = {
        id: Number(req.params.id),
      };

      // 입력 값 체크
      if (!params.id || isNaN(params.id)) {
        const err = new ErrorClass(resCode.BAD_REQUEST_INVALID, 'Invalid value (id: number)');

        const resJson = resError(err);

        return res.status(resJson.status).json(resJson);
      }

      // 비즈니스 로직 호출
      const result = await companyService.delete(params);

      // 최종 응답 값 세팅
      const resJson = resSuccess(result, resType.DELETE);

      return res.status(resJson.status).json(resJson);
    } catch (err) {
      // 에러 응답 값 세팅
      const resJson = resError(err);

      return res.status(resJson.status).json(resJson);
    }
  }
);

export { router };
