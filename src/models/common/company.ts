import { Model, DataTypes, WhereOptions, Order } from 'sequelize'
import { sequelize } from '../sequelize'

export interface CompanyAttributes {
  id: number;
  name: string;
  code: string;
  registrationNumber: string | null;
  corporationNumber: string | null;
  ceoName: string | null;
  businessType: string | null;
  businessItem: string | null;
  phone: string | null;
  email: string | null;
  homepage: string | null;
  zipCode: string | null;
  address: string | null;
  tags: Array<string> | null;
  userId: number | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

class Company extends Model implements CompanyAttributes {
  public readonly id!: CompanyAttributes['id'];
  public name!: CompanyAttributes['name'];
  public code!: CompanyAttributes['code'];
  public registrationNumber!: CompanyAttributes['registrationNumber'];
  public corporationNumber!: CompanyAttributes['corporationNumber'];
  public ceoName!: CompanyAttributes['ceoName'];
  public businessType!: CompanyAttributes['businessType'];
  public businessItem!: CompanyAttributes['businessItem'];
  public phone!: CompanyAttributes['phone'];
  public email!: CompanyAttributes['email'];
  public homepage!: CompanyAttributes['homepage'];
  public zipCode!: CompanyAttributes['zipCode'];
  public address!: CompanyAttributes['address'];
  public tags!: CompanyAttributes['tags'];
  public userId!: CompanyAttributes['userId'];
  public description!: CompanyAttributes['description'];
  public readonly createdAt!: CompanyAttributes['createdAt'];
  public readonly updatedAt!: CompanyAttributes['updatedAt'];
  public readonly deletedAt!: CompanyAttributes['deletedAt'];  
}

Company.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    registrationNumber: {
      type: DataTypes.STRING(30),
    },
    corporationNumber: {
      type: DataTypes.STRING(30),
    },
    ceoName: {
      type: DataTypes.STRING(20)
    },
    businessType: {
      type: DataTypes.STRING(500),
    },
    businessItem: {
      type: DataTypes.STRING(500),
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    email: {
      type: DataTypes.STRING(255),
    },
    homepage: {
      type: DataTypes.STRING(255),
    },
    zipCode: {
      type: DataTypes.STRING(10),
    },
    address: {
      type: DataTypes.STRING(500),
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    userId: {
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

export default Company;

