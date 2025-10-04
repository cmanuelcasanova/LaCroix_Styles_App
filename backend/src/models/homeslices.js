import { DataTypes } from 'sequelize';

export const homeslice_model = (sequelize) => {
  const homeslice = sequelize.define('homeslice', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    imageurl: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },{
    timestamps: false, 
  }
);


  return homeslice;
};
