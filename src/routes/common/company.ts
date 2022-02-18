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
    };

    // 비즈니스 로직 호출
    const result = await companyService.reg(params);
    return res.send('success');
  } catch (err) {
    return res.send('err');
  }
});

// company 리스트 조회
router.get('/', async (req: Request<unknown, unknown, unknown, CompanySelectListParams>, res: Response) => {
  try {
    // 요청 파라미터
    const params: CompanySelectListParams = {
      name: req.query.name,
      code: req.query.code,
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

export { router };
