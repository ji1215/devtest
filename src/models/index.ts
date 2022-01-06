// common
import Company from './common/company';
import Department from './common/department';
import User from './common/user';
import UserDepartmentJoin from './common/userDepartmentJoin';

export * from './sequelize';

const db = {
  // common
  Company,
  Department,
  User,
  UserDepartmentJoin
};

export type dbType = typeof db;

// 모든 테이블의 관계 설정은 이곳에 한다. (Model파일에 설정할 경우 순환 참조 발생 함)
// 'belongsTo'관계는 반드시 표현할 것

/* common */

/*
hasMany : 하나의 source 모델을 여러개의 Target 모델과 연결 ex) 여러개의 City(도시)를 가지는 Country(국가)
belongsToMany : n:m 관계 설정시 사용
belongsTo : 1:1 ex) 무한도전에 속해있는 유재석
*/


// Company
Company.hasMany(Department, { foreignKey: { name: 'companyId' }, onDelete: 'CASCADE', as: 'Departments' });

// Department
Department.belongsTo(Company, { foreignKey: { name: 'companyId' }, onDelete: 'CASCADE', as: 'Company' });
Department.belongsToMany(User, {
  through: UserDepartmentJoin,
  foreignKey: { name: 'departmentId' },
  onDelete: 'CASCADE',
  as: 'Users',
});

// User
User.belongsTo(Company, { foreignKey: { name: 'companyId' }, onDelete: 'SET NULL', as: 'Company' });
User.belongsToMany(Department, {
  through: UserDepartmentJoin,
  foreignKey: { name: 'userId' },
  onDelete: 'CASCADE',
  as: 'Departments',
});