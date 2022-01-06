import { Model, DataTypes, WhereOptions, Order } from 'sequelize';
import { sequelize } from '../sequelize';
import User from './user';
import Department from './department';

// 기본 interface
export interface UserDepartmentJoinAttributes {
  id: number;
  userId: number;
  departmentId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

class UserDepartmentJoin extends Model implements UserDepartmentJoinAttributes {
  public readonly id!: UserDepartmentJoinAttributes['id'];
  public userId!: UserDepartmentJoinAttributes['userId'];
  public departmentId!: UserDepartmentJoinAttributes['departmentId'];
  public readonly createdAt!: UserDepartmentJoinAttributes['createdAt'];
  public readonly updatedAt!: UserDepartmentJoinAttributes['updatedAt'];
  public readonly deletedAt!: UserDepartmentJoinAttributes['deletedAt'];
}

UserDepartmentJoin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: 'user_department',
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      }
    },
    departmentId: {
      type: DataTypes.INTEGER,
      unique: 'user_department',
      allowNull: false,
      references: {
        model: Department,
        key: 'id',
      }
    },
  },
  {
    sequelize,
    // tableName: 'tableName', // table명을 수동으로 생성 함
    // freezeTableName: true, // true: table명의 복수형 변환을 막음
    underscored: true, // true: underscored, false: camelCase
    timestamps: true, // createAt, updatedAt
    paranoid: true, // deletedAt
  }
);

export default UserDepartmentJoin;