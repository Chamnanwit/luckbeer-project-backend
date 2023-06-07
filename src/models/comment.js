module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      message: {
        type: DataTypes.STRING,
        allowNull: false,
        validata: {
          notEmpty: true,
        },
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Comment.belongsTo(models.Beer, {
      foreignKey: {
        name: "beerId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Comment;
};
