import { DataTypes } from 'sequelize';

export const Product_Talla_Model = (sequelize) => {
  const Product_Talla = sequelize.define('Product_Talla', {

  },{

    timestamps: false, 
  }


);

  return Product_Talla;
};
