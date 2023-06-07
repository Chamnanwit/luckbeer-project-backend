module.exports = (sequelize, DataTypes) => {
  const Beer = sequelize.define(
    "Beer",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      percentAlcohol: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      numberLike: DataTypes.INTEGER,
    },
    {
      underscored: true,
      paranoid: true,
    }
  );

  Beer.associate = (models) => {
    Beer.hasMany(models.Like, {
      foreignKey: {
        name: "beerId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Beer.hasMany(models.Comment, {
      foreignKey: {
        name: "beerId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Beer.hasOne(models.ImageBeer, {
      foreignKey: {
        name: "beerId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Beer.belongsTo(models.Brewery, {
      foreignKey: {
        name: "breweryId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Beer.belongsTo(models.Type, {
      foreignKey: {
        name: "typeId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Beer;
};
