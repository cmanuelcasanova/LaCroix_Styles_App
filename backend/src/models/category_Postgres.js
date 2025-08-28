import { DataTypes } from 'sequelize';

export const CatModel = (sequelize) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  
  Category.associate = (models) => {
    Category.hasMany(models.Product, { foreignKey: 'categoryId' });
    Category.hasMany(models.Tag, { foreignKey: 'categoryId' });

  };

  return Category;
};