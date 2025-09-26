import { DataTypes } from 'sequelize';

export const ShoppingModel = (sequelize) => {
  const Shopping = sequelize.define('Shopping', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tallaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
      model: 'Tallas',
      key: 'id'
    }

    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },



  });

  
  Shopping.associate = (models) => {
    Shopping.belongsTo(models.User, { foreignKey: 'userId' });
    Shopping.belongsTo(models.Product, { foreignKey: 'productId' });
    Shopping.belongsTo(models.Talla, { foreignKey: 'tallaId' });
  };

  return Shopping;
};
