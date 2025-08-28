// models/index.js
import { sequelize } from '../config/Postgres.js';
import { UserModel } from './user_Postgres.js';
import { ProductModel } from './product_Postgres.js';
import { CatModel } from './category_Postgres.js';
import { TagModel } from './tag_Postgres.js';

const db = {};

db.sequelize = sequelize;
db.User = UserModel(sequelize);
db.Product = ProductModel(sequelize);
db.Category = CatModel(sequelize);
db.Tag = TagModel(sequelize);

// Ejecutar asociaciones si existen
Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

export { db };


