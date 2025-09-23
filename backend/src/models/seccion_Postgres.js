import { DataTypes } from 'sequelize';

export const SecModel = (sequelize) => {
  const Seccion = sequelize.define('Seccion', {
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

  
  Seccion.associate = (models) => {
    Seccion.hasMany(models.Product, { foreignKey: 'seccionId' });

  };

  return Seccion;
};