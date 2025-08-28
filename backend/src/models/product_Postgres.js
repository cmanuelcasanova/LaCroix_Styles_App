// models/product_Postgres.js
import { DataTypes } from 'sequelize';

export const ProductModel = (sequelize) => {
  const Product = sequelize.define('Product', {
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
    talla: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    precio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });


  Product.associate = (models) => {
    Product.belongsTo(models.User, { foreignKey: 'userId' });
    Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
    Product.belongsToMany(models.Tag, { through: 'ProductTags' }); 
  };

  return Product;
};