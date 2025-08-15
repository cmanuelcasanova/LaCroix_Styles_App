import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({quiet: true} );

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error('DATABASE_URL is not defined');
}

export const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  logging: false,
});

