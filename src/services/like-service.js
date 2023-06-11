const { Like } = require("../models");

exports.findLikeById = (beerId, userId) =>
  Like.findOne({
    where: {
      beerId: beerId,
      userId: userId
    },
  });

exports.unLike = (beerId, userId) =>
  Like.destroy({
    where: {
        beerId: beerId,
        userId: userId
      },
    });

exports.like = () => Like.create();
