import { DataTypes } from 'sequelize';
import { sequelize } from '../config/Postgres.js';

export const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false

  },
  talla: {
    type: DataTypes.STRING,
    allowNull: true

  },
  precio: {
    type: DataTypes.STRING,
    allowNull: false

  },
   userId: { // 👈 esta es la foreign key
    type: DataTypes.INTEGER,
    allowNull: false,
  },




});