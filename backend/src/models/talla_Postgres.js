import { DataTypes } from 'sequelize';

export const TallaModel = (sequelize) => {
  const Talla = sequelize.define('Talla', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },{
    timestamps: false, 
  }
);

  Talla.associate = (models) => {
    Talla.belongsToMany(models.Product, { through: models.Product_Talla });
    Talla.hasMany(models.Shopping, { foreignKey: 'tallaId' });
  };

  return Talla;
};
