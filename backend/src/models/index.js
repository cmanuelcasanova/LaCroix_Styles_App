// models/index.js
import { sequelize } from '../config/Postgres.js';
import { UserModel } from './user_Postgres.js';
import { ProductModel } from './product_Postgres.js';
import { SecModel } from './seccion_Postgres.js';
import { ShoppingModel } from './shopping_Postgres.js';
import { TallaModel } from './talla_Postgres.js';
import { Product_Talla_Model } from './product_talla_Postgres.js';

const db = {};

db.sequelize = sequelize;
db.User = UserModel(sequelize);
db.Product = ProductModel(sequelize);
db.Seccion = SecModel(sequelize);
db.Shopping = ShoppingModel(sequelize);
db.Talla = TallaModel(sequelize);
db.Product_Talla = Product_Talla_Model(sequelize)



Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

export { db };


