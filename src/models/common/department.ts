import { Model, DataTypes, WhereOptions, Order } from 'sequelize';
import { sequelize } from '../sequelize';

// 기본 interface
export interface DepartmentAttributes {
  id: number;
  companyId: number;
  name: string;
  parent: number;
  level: number;
  fullPath: string | null;
  orderby: number | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

class Department extends Model implements DepartmentAttributes {
  public readonly id!: DepartmentAttributes['id'];
  public companyId!: DepartmentAttributes['companyId'];
  public name!: DepartmentAttributes['name'];
  public parent!: DepartmentAttributes['parent'];
  public level!: DepartmentAttributes['level'];
  public fullPath!: DepartmentAttributes['fullPath'];
  public orderby!: DepartmentAttributes['orderby'];
  public description!: DepartmentAttributes['description'];
  public readonly createdAt!: DepartmentAttributes['createdAt'];
  public readonly updatedAt!: DepartmentAttributes['updatedAt'];
  public readonly deletedAt!: DepartmentAttributes['deletedAt'];
}

export const DepartmentDefaults = {
  parent: 0,
  level: 0,
}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    parent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DepartmentDefaults.parent,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DepartmentDefaults.level,
    },
    fullPath: {
      type: DataTypes.STRING(2000),
    },
    orderby: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
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

export default Department;