import { sequelize } from '../config/Postgres.js';
import { Product } from './product_Postgres.js';
import { User } from './user_Postgres.js';


User.hasMany(Product, { foreignKey: 'userId' });
Product.belongsTo(User, { foreignKey: 'userId' });

export const db = {
  sequelize,
  Product,
  User
};

