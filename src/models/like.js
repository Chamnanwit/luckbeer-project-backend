module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {},
    {
      underscored: true,
    }
  );

  Like.associate = (models) => {
    Like.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Like.belongsTo(models.Beer, {
      foreignKey: {
        name: "beerId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Like;
};
