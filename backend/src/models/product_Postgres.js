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
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
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
    seccionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });


  Product.associate = (models) => {
    Product.belongsTo(models.User, { foreignKey: 'userId' });
    Product.belongsTo(models.Seccion, { foreignKey: 'seccionId' });
    Product.hasMany(models.Shopping, { foreignKey: 'productId' }); 
    Product.hasMany(models.product_images, { foreignKey: 'productId' }); 
    Product.belongsToMany(models.Talla, { through: models.Product_Talla });

  };

  return Product;
};