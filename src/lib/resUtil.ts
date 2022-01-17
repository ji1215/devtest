import { literal as sequelizeLiteral, OrderItem } from 'sequelize';

// 응답 타입 설정

// insert 설정
export interface InsertedResult {
  insertedId: number;
}
