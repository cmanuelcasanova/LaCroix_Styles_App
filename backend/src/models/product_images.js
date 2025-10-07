import { DataTypes } from 'sequelize';

export const Product_Images_model = (sequelize) => {
  const product_images = sequelize.define('product_images', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    imageurl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  },{
    timestamps: false, 
  }
);

 product_images.associate = (models) => {
    product_images.belongsTo(models.Product, { foreignKey: 'productId' });


  };


  return product_images;
};