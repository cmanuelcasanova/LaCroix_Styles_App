import { DataTypes } from 'sequelize';
import { sequelize } from '../config/Postgres.js';

export const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  done: {
    type: DataTypes.BOOLEAN,
    allowNull: true

  },
   userId: { // 👈 esta es la foreign key
    type: DataTypes.INTEGER,
    allowNull: false,
  },




});