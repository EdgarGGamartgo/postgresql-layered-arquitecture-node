import fs from 'fs'
import { Sequelize } from 'sequelize'

export const seeds = fs.readFileSync('src/data-access/UserTable.sql', 'utf8');
export const db = new Sequelize('postgres', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  omitNull: true,
  port: 5432,
  dialectOptions: {
    multipleStatements: true
  }
});
