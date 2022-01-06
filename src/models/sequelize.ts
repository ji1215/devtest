import {Sequelize} from 'sequelize';
import dbConfig from '../config/dbConfig';

const { database, username, password, host, port, dialect} = dbConfig;

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