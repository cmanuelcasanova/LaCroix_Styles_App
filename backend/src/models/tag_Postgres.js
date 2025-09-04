// models/tag_Postgres.js
import { DataTypes } from "sequelize";

export const TagModel = (sequelize) => {
  const Tag = sequelize.define(
    "Tag",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
      seccionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["name", "seccionId"],
        },
      ],
    }
  );

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Product, { through: "ProductTags" });
    Tag.belongsTo(models.Seccion, { foreignKey: "seccionId" });
  };

  return Tag;
};
