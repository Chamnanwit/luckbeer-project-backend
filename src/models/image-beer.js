module.exports = (sequelize, DataTypes) => {
  const IamgeBeer = sequelize.define(
    "ImageBeer",
    {
      image1: DataTypes.STRING,
      image2: DataTypes.STRING,
      image3: DataTypes.STRING,
      image4: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );

  IamgeBeer.associate = (models) => {
    IamgeBeer.belongsTo(models.Beer, {
      foreignKey: {
        name: "beerId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return IamgeBeer;
};
