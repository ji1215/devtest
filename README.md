# node 버전

권장 node버전: `node 14`

# 시작 (typescript + nodejs + express)

## nodejs 시작

```console
> npm init
...
package name: (uvcframe-nodejs) uvcframe-nodejs
...
```

(적당한 정보를 입력한다.)

## 필수 npm 라이브러리 설치

```console
> npm i typescript
> npm i @types/node
> npm i morgan cors cookie-parser
> npm i @types/morgan @types/cors @types/cookie-parser
> npm i express dotenv
> npm i @types/express @types/dotenv
> npm i hpp helmet
> npm i @types/hpp @types/helmet
> npm i sequelize sequelize-cli
```

## DB 드라이버 설치

연결할 DB 종류에 따라 다음과 같이 설치한다.

```shell
> npm i pg pg-hstore # Postgres
> npm i mysql2
> npm i mariadb
> npm i sqlite3
> npm i tedious # Microsoft SQL Server
```

본 예제에서의 DB는 `PostgreSQL`을 사용한다.

## 개발 환경

```console
> npm i -D ts-node nodemon
```

### nodemon 설정

`package.json`을 다음과 같이 설정 한다.

> /package.json

```json
{
  ...
    "scripts": {
    "dev": "nodemon",
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "npx tsc && node build"
  },
  ...
}
```

개발시 `nodemon`을 사용하기 위해 `nodemon.json`을 생성한다.

> /nodemon.json

```json
{
  "exec": "ts-node ./src/index.ts",
  "ext": "js json ts"
}
```

### 실행방법

#### 1) 개발환경 실행

`nodemon`을 이용하여 `ts`파일을 직접 실행 시키는 방법 (일반적인 개발 시 사용)

```console
> npm run dev
```

#### 2) 운영 환경 실행

실제 운영에서는 `ts`파일을 `js`로 빌드한 후 실행 시킨다.  
(실제 운영 파일은 `/build/**.js`이다)

```console
> npm run start
```

## typescript 환경설정

`tsconfig.json`파일을 생성한다.

> /tsconfig.json

```js
{
  "compilerOptions": {
    "target": "ES2016" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016',  */,
    "module": "commonjs" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */,
    "outDir": "./build" /* Redirect output structure to the directory. */,
    "rootDir": "./src" /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */,
    "strict": true /* Enable all strict type-checking options. */,
    "moduleResolution": "node" /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */,
    "baseUrl": "./src" /* Base directory to resolve non-absolute module names. */,
    "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */,
    "skipLibCheck": true /* Skip type checking of declaration files. */,
    "forceConsistentCasingInFileNames": true /* Disallow inconsistently-cased references to the same file. */
  },
  "include": ["src/**/*"]
}
```

(위 내용은 참고사항이고 필요한 값을 적절히 세팅 한다.)

[moduleResolution에 대한 참고 링크](https://www.typescriptlang.org/docs/handbook/module-resolution.html)

소스코드 확인은 다음과 같다.

```console
> npx tsc --traceResolution
```

## .env 파일 생성

개발을 위해 `dotenv`를 사용하며 환경 설정은 다음과 같다.

> /.env

```
NODE_ENV=development
NODE_ENV_VALUES=development|test|production
NODE_PORT=3030
LOGGER_LEVEL=debug
LOGGER_LEVEL_VALUES=debug|info
DB_HOST=192.168.0.123
DB_PORT=5432
DB_DATABASE=postgres
DB_ID=postgres
DB_PASS=postgres
DB_DIALECT=postgres
```

# 최초 테스트를 위한 index.ts 파일

`index.ts`파일을 생성한다.

> /src/index.ts

```javascript
import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port = Number(process.env.NODE_PORT || "3030");

app.set("port", port);

app.get("/", (req, res) => {
  res.send("Hello devtest");
});

app.listen(app.get("port"), () => {
  console.log(`server is running on ${port}`);
});
```

## 서비스 동작

위와 같이 `index.ts`를 간단히 만들고 서비스를 띄워 보자.

```console
> npm run dev

> uvcframe-nodejs@1.0.0 dev D:\UVC\Devjob\uvcframe-nodejs
> nodemon

[nodemon] 2.0.6
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,json,ts
[nodemon] starting `ts-node ./src/index.ts`
server is running on 3030
```

위와 같이 뜨면 정상.

# ESLint & Prettier 설정

## eslint 설치

```console
> npm i -D eslint
```

## eslint 환경설정

환경 설정에 대한 질문에 대해 적절히 응답한다.

```shell
> npx eslint --init

√ How would you like to use ESLint?
  To check syntax only
❯ To check syntax and find problems # 선택
  To check syntax, find problems, and enforce code style

√ What type of modules does your project use?
❯ JavaScript modules (import/export) # 선택
  CommonJS (require/exports)
  None of these

√ Which framework does your project use?
  React
  Vue.js
❯ None of these # 선택

√ Does your project use TypeScript? · No / Yes # Yes 선택

√ Where does your code run?
  Browser
❯ Node # 선택

√ What format do you want your config file to be in? · JSON
  JavaScript
  YAML
❯ JSON # 선택

The config that you've selected requires the following dependencies:

@typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
√ Would you like to install them now with npm? · No / Yes # Yes를 선택하여 필요한 모듈을 설치한다.

Installing @typescript-eslint/eslint-plugin@latest, @typescript-eslint/parser@latest
npm WARN uvcframe-nodejs@1.0.0 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.1.3 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.1.3: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

+ @typescript-eslint/parser@4.12.0
+ @typescript-eslint/eslint-plugin@4.12.0
added 31 packages from 31 contributors and audited 443 packages in 5.873s

36 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

Successfully created .eslintrc.json file in D:\UVC\Devjob\uvcframe-nodejs
```

다음과 같은 eslint 설정 파일이 생성된다.

> /.eslintrc.json

```json
{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {}
}
```

## Prettier 설치

```console
> npm i -D prettier --save-exact
> npm i -D eslint-plugin-prettier eslint-config-prettier
```

버전이 달라지면서 코드가 엉망되는 것을 방지하기 위해 `--save-exact`옵션을 붙인다.

### `.eslintrc.json`파일에 `prettier` 설정을 다음과 같이 추가 한다.

```json
{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json",
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "ignorePatterns": ["build/", "node_modules/"],
  "plugins": ["@typescript-eslint", "prettier"],
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ]
  }
}
```

## Prettier 설정

> /.prettierrc.json

```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "consistent",
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

`.prettierrc.json` 설정은 다음과 같다. (설정 수정 후 VSCode를 재시작 해야 자동 수정이 적용됨)

- printWidth: (default: 80): 한 줄에 이 글자 수를 넘어설 수 없음
- tabWidth: (default: 2): 탭 간격
- singleQuote: (default: false): 홑따옴표(`'`)를 쓸 것인지 여부
- trailingComma: (default: "none"): 객체, 배열, 함수 등의 후행에 쉼표(`,`)를 찍을지 여부
  - "none": 쉼표를 붙이지 않음
  - "es5": ES5에서 유효한 후행 쉼표를 붙임 (객체, 배열 등)
  - "all": 가능하면 후행 쉼표를 붙임 (함수 인수)
- bracketSpacing: (default: true): 객체 리터럴 내부의 공백을 제어함
- jsxBracketSameLine: (default: false): jsx요소의 마지막 다음 줄에 닫기(`>`)표시를 함
- parse: (default: "babylon"): Javascript에서만 사용되며 파서를 설정함
  - "babylone" or "flow"
- semi: (default: true): 문장 뒤에 세미콜론(`;`)을 붙일지 뺄지를 결정
- useTabs: (default: false): 탭이있는 줄의 들여쓰기 여부
- proseWrap: (default: "preserve"): markdown 텍스트의 줄바꿈 방식
- arrowParens: (default: "avoid"): 단독 화살표 함수의 매개 변수 주위에 괄호를 자동으로 붙임
- htmlWhitespaceSensitivity: (default: "css"): HTML 공백 감도 설정
- endOfLine: (default: "auto"): EoF방식 설정 (OS별로 처리 방식 다름)
- quoteProps: (default: "as-needed"): 객체 속성에 쿼테이션 적용 방식
- requireConfig: (default: false): prettierConfig 파일을 적용할지 여부
- ignorePath: (default: .prettierignore): prettier가 적용되지 않는 파일 기재
- disableLanguages: (default: ["vue"]): 이 확장 기능을 비활성화 할 언어 ID 목록

## VSCode에서 자동 스타일 맞춤을 적용한다.

1. VSCode의 `Extensions: Marketplace`에서 `ESLint`와 `Prettier`를 검색하여 설치한다.
2. VSCode의 세팅파일 `.settings.json`을 다음과 같이 정리한다.
   > /.vscode/settings.json

```json
{
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

# Sequelize

## Sequelize 초기화

처음 sequelize의 디렉토리 및 환경설정 파일을 잡아주기 위해 다음과 같이 실행 한다.

```shell
> cd src  # src 디렉토리로 이동
> npx sequelize init  # sequelize 초기화

Sequelize CLI [Node: 12.20.0, CLI: 6.2.0, ORM: 6.3.5]

Created "config\config.json"
Successfully created models folder at "D:\UVC\Devjob\uvcframe-nodejs\src\models".
Successfully created migrations folder at "D:\UVC\Devjob\uvcframe-nodejs\src\migrations".
Successfully created seeders folder at "D:\UVC\Devjob\uvcframe-nodejs\src\seeders".
```

다음과 같은 구조가 생성됨

```
...
├── src
│   ├── config
│   │   └── config.json
│   ├── migrations
│   ├── models
│   │   └── index.js
│   ├── seeders
...
```

## DB생성

**`Sequelize-cli`를 이용하여 생성하려면**

1. `config.json` 파일을 `config.js` 파일로 변경 해야 한다.
   > /src/config/config.json --> config.js

```javascript
module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "postgres",
    host: "192.160.0.123",
    port: "5432",
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "postgres",
    host: "192.160.0.123",
    port: "5432",
    dialect: "postgres",
  },
  production: {
    username: "postgres",
    password: "postgres",
    database: "postgres",
    host: "192.160.0.123",
    port: "5432",
    dialect: "postgres",
  },
};
```

2. 다음의 명령어를 이용해서 DB를 생성 한다.

```console
> npx sequelize db:create
```

하지만 config파일의 위치가 맞지 않아서 실패할 것이다.  
**따라서 DB는 별도로 만들어 두자.**

## Sequelize 정보 세팅

### config.js --> dbConfig.ts로 변환

환경설정은 운영/배포 방식에 따라 적절히 적용 하도록 한다.  
(아래 설정은 `NODE_ENV`환경에 따라 나누지 않았음)

> /src/config/dbConfig.ts

```javascript
import * as dotenv from 'dotenv';
dotenv.config();

type DBConfig = {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';
};

const dbConfig: DBConfig = {
  username: process.env.DB_ID || '',
  password: process.env.DB_PASS || '',
  database: process.env.DB_DATABASE || '',
  host: process.env.DB_HOST || '',
  port: Number(process.env.DB_PORT || '5432'),
  dialect: process.env.DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql',
};

export default dbConfig;
```

### `models/index.js`파일 재 작성

`models/index.js`파일을 그대로 사용하는 경우 순환참조 문제가 발생한다.  
따라서 `sequelize.ts`파일과 `index.ts`파일로 코드를 나누어 처리 한다.

#### `sequelize.ts`파일 생성

> /src/models/sequelize.ts

```javascript
import { Sequelize } from "sequelize";
import dbConfig from "../config/dbConfig";

// if (NODE_ENV설정에 따라 구분되는 경우에는 아래와 같이 처리 한다.)
// const env = (process.env.NODE_ENV as 'production' | 'test' | 'development') || 'development';
// const { database, username, password, host, port, dialect } = dbConfig[env];

// else (NODE_ENV 설정에 따라 구분하지 않는 경우에는 아래와 같이 처리 한다.)
const { database, username, password, host, port, dialect } = dbConfig;

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect,
  pool: {
    max: 30,
    min: 0,
  },
});

export { sequelize };
export default sequelize;
```

#### `models/index.ts`파일 수정

(`index.js`파일을 다음과 같이 변경한다.)

> /src/models/index.ts

```javascript
export * from "./sequelize";
```

# Model 생성

기본 모델을 생성하고 테이블을 만들어 본다.

## Model 파일 생성

### Company

```javascript
import { Model, DataTypes, WhereOptions, Order } from 'sequelize';
import { sequelize } from '../sequelize';

// 기본 interface
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
  public address!: CompanyAttributes['address1'];
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
      type: DataTypes.STRING(20),
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
```

### User

```javascript
import { Model, DataTypes, WhereOptions, Order } from 'sequelize'
import { NullLiteral } from 'typescript'
import { sequelize } from '../sequelize'

export interface UserAttributes {
  id: number;
  companyId: number | null;
  userid: string;
  password: string;
  name: string;
  auth: 'system' | 'admin' | 'staff';
  email: string | null;
  mobild: string | null;
  active: boolean | null;
  loginFailCount: number;
  lastLogin: Date | null;
  lastLogout: Date | null;
  updatePassword: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
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
  public mobild!: UserAttributes['mobild'];
  public active!: UserAttributes['active'];
  public loginFailCount!: UserAttributes['loginFailCount'];
  public lastLogin!: UserAttributes['lastLogin'];
  public lastLogout!: UserAttributes['lastLogout'];
  public updatePassword!: UserAttributes['updatePassword'];
  public createdAt!: UserAttributes['createdAt'];
  public updatedAt!: UserAttributes['updatedAt'];
  public deletedAt!: UserAttributes['deletedAt'];
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
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
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
    lastLㄴㅁㄴㅁㅇㄴ
  {
    sequelize,
    underscored: true,
    timestamps: true,
    paranoid: true,
  }
)

export default User;
```

### Department

```javascript
import { resourceUsage } from 'process';
import { Model, DataTypes, WhereOptions, Order } from 'sequelize'
import { transpileModule } from 'typescript';
import { sequelize } from '../sequelize'

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
  updatedAt: Date | null;
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
      allowNull: false,
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
    underscored: true,
    timestamps: true, // 자동적으로 createdAt, updatedAt column을 생성
    paranoid: true, // deletedAt column이 table에 추가
  }
)

export default Department;

```

### UserDepartmentJoin

```javascript
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
```

## 모델간의 관계설정

sequelize를 이용한 모델과의 관계설정은 공식 문서를 참조 할 것  
[Associations](https://sequelize.org/master/manual/assocs.html)  
[연결 가져 오기-Eager Loading vs Lazy Loading](https://sequelize.org/master/manual/assocs.html#fetching-associations---eager-loading-vs-lazy-loading)

### `models/index.ts`파일에 모델들의 정보 세팅

모델 정보 및 관계 설정은 다음과 같이 한다.

> /src/models/index.ts

```javascript
// common
import Company from "./common/company";
import Department from "./common/department";
import User from "./common/user";
import UserDepartmentJoin from "./common/userDepartmentJoin";

export * from "./sequelize";

const db = {
  // common
  Company,
  Department,
  User,
  UserDepartmentJoin,
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
Company.hasMany(Department, {
  foreignKey: { name: "companyId" },
  onDelete: "CASCADE",
  as: "Departments",
});

// Department
Department.belongsTo(Company, {
  foreignKey: { name: "companyId" },
  onDelete: "CASCADE",
  as: "Company",
});
Department.belongsToMany(User, {
  through: UserDepartmentJoin,
  foreignKey: { name: "departmentId" },
  onDelete: "CASCADE",
  as: "Users",
});

// User
User.belongsTo(Company, {
  foreignKey: { name: "companyId" },
  onDelete: "SET NULL",
  as: "Company",
});
User.belongsToMany(Department, {
  through: UserDepartmentJoin,
  foreignKey: { name: "userId" },
  onDelete: "CASCADE",
  as: "Departments",
});
```

**주의** 테이블 조인에 대한 Alias 부여 시 복수형과 단수형을 제대로 해주어야 헷갈림을 방지할 수 있다.
**모델간의 관계 설정을 모델 마다 모두 써주는 이유**: 해당 모델을 호출해서 사용할때 사용 가능여부가 결정 된다.

## 메인 `index.ts`파일에 sequelize를 연결한다.

> /src/index.ts

```javascript
...
import { sequelize } from './models';

dotenv.config();

const app = express();

const port = Number(process.env.NODE_PORT || '3030');
const env = (process.env.NODE_ENV as 'production' | 'test' | 'development') || 'development';

app.set('port', port);

// sequelize sync 동작 (Table 자동 생성 옵션)
sequelize
  .sync({
    force: false,
  })
  .then(() => {
    console.log('Sequelize sync success');
  })
  .catch((err: Error) => {
    console.error(err);
  });
...
```

`npm run dev`를 실행 시키면 다음과 같은 쿼리가 보이고 해당 테이블이 DB에 생성된 것이 확인 된다.

```sql
server is running on 3030
Executing (default): CREATE TABLE IF NOT EXISTS "companies" ("id"  SERIAL , "name" VARCHAR(50) NOT NULL, "code" VARCHAR(50) NOT NULL UNIQUE, "registration_number" VARCHAR(30), "corporation_number" VARCHAR(30), "ceo_name" VARCHAR(20), "business_type" VARCHAR(500), "business_item" VARCHAR(500), "phone" VARCHAR(20), "email" VARCHAR(255), "homepage" VARCHAR(255), "zip_code" VARCHAR(10), "address" VARCHAR(500), "tags" VARCHAR(255)[], "user_id" INTEGER, "description" TEXT, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));
...
```

(`sequelize.sync`옵션을 빼면 테이블 자동 생성이 생략 된다.)
