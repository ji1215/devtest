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
  DepartmentInsertParams,
  DepartmentSelectListParams,
  // DepartmentSelectInfoParams,
  DepartmentUpdateParams,
  DepartmentDeleteParams,
} from '../../models/common/department';
import { service as departmentService } from '../../service/common/departmentService';

const router = express.Router();

// department 등록
router.post('/', async (req: Request<unknown, unknown, DepartmentInsertParams, unknown>, res: Response) => {
  try {
    const params: DepartmentInsertParams = {
      companyId: req.body.companyId,
      name: req.body.name,
      parent: req.body.parent,
      orderby: req.body.orderby,
      description: req.body.description
    };

    // 비즈니스 로직 호출
    const result = await departmentService.reg(params);

    // 최종 응답 값 세팅
    const resJson = resSuccess(result, resType.REG);
    return res.status(resJson.status).json(resJson);

  } catch (err) {
    // 에러 응답 값 세팅
    const resJson = resError(err);
    return res.status(resJson.status).json(resJson);
  }
});

// department 리스트 조회
router.get('/', async (req: Request<unknown, unknown, unknown, DepartmentSelectListParams>, res: Response) => {
  try {
    // 요청 파라미터
    const params: DepartmentSelectListParams = {
      companyIds: req.query.companyIds
        ? ((req.query.companyIds as unknown) as string).split(',').map((i) => Number(i))
        : null,
      name: req.query.name,
      //userYn: req.query.userYn, 
      limit: Number(req.query.limit || 'NaN'),
      offset: Number(req.query.offset || 'NaN'),
      order: req.query.order || 'fullPath', // 기본 정렬은 'fullPath'로 한다.
    };

    // 비즈니스 로직 호출
    const result = await departmentService.list(params);

    // 최종 응답 값 세팅
    const resJson = resSuccess(result, resType.LIST);

    return res.status(resJson.status).json(resJson);
  } catch (err) {
    // 에러 응답 값 세팅
    const resJson = resError(err);

    return res.status(resJson.status).json(resJson);
  }
});


// department 정보 수정
router.put('/id/:id', async (req: Request<DepartmentUpdateParams, unknown, DepartmentUpdateParams, unknown>, res: Response) => {
  try {
    // 요청 파라미터
    const params: DepartmentUpdateParams = {
      id: Number(req.params.id),
      name: req.body.name,
      fullPath: '',
      orderby: req.body.orderby,
      description: req.body.description
    };

    // 비즈니스 로직 호출
    const result = await departmentService.edit(params);

    // 최종 응답 값 세팅
    const resJson = resSuccess(result, resType.EDIT);

    return res.status(resJson.status).json(resJson);
  } catch (err) {
    // 에러 응답 값 세팅
    const resJson = resError(err);

    return res.status(resJson.status).json(resJson);
  }
});

// department 삭제
router.delete(
  '/id/:id',
  async (req: Request<DepartmentDeleteParams, unknown, unknown, unknown>, res: Response) => {
    try {
      // 요청 파라미터
      const params: DepartmentDeleteParams = {
        id: Number(req.params.id),
      };

      // 입력 값 체크
      if (!params.id || isNaN(params.id)) {
        const err = new ErrorClass(resCode.BAD_REQUEST_INVALID, 'Invalid value (id: number)');

        const resJson = resError(err);

        return res.status(resJson.status).json(resJson);
      }

      // 비즈니스 로직 호출
      const result = await departmentService.delete(params);

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