import { Model, DataTypes, WhereOptions, Order } from 'sequelize';
import { sequelize } from '../sequelize';

// 기본 interface
export interface UserAttributes {
  id: number;
  companyId: number | null;
  userid: string;
  password: string;
  name: string;
  auth: string;
  email: string;
  mobile: string;
  active: boolean;
  loginFailCount: number;
  lastLogin: Date;
  lastLogout: Date;
  updatedPassword: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

class User extends Model implements UserAttributes {
  public readonly id!: UserAttributes['id'];
  public companyId!: UserAttributes['companyId'];
  public userid!: UserAttributes['userid'];
  public password!: UserAttributes['password'];
  public name!: UserAttributes['name'];
  public auth!: UserAttributes['auth'];
  public email!: UserAttributes['email'];
  public mobile!: UserAttributes['mobile'];
  public active!: UserAttributes['active'];
  public loginFailCount!: UserAttributes['loginFailCount'];
  public lastLogin!: UserAttributes['lastLogin'];
  public lastLogout!: UserAttributes['lastLogout'];
  public updatedPassword!: UserAttributes['updatedPassword'];
  public readonly createdAt!: UserAttributes['createdAt'];
  public readonly updatedAt!: UserAttributes['updatedAt'];
  public readonly deletedAt!: UserAttributes['deletedAt'];
}

export const UserDefaults = {
  auth: 'staff',
  active: false,
  loginFailCount: 0,
};

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
    },
    userid: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    auth: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: UserDefaults.auth,
    },
    email: {
      type: DataTypes.STRING(255),
    },
    mobile: {
      type: DataTypes.STRING(20),
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: UserDefaults.active,
    },
    loginFailCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: UserDefaults.loginFailCount,
    },
    lastLogin: {
      type: DataTypes.DATE,
    },
    lastLogout: {
      type: DataTypes.DATE,
    },
    updatedPassword: {
      type: DataTypes.DATE,
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

export default User;
