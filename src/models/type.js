module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define(
    "Type",
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      underscored: true,
    }
  );

  Type.associate = (models) => {
    Type.hasMany(models.Beer, {
      foreignKey: {
        name: "typeId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Type;
};
