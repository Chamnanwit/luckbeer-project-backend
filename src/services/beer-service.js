const { where } = require("sequelize");
const {
  Beer,
  Type,
  Comment,
  Like,
  ImageBeer,
  Brewery,
  User,
} = require("../models");

exports.getAllBeer = () =>
  Beer.findAll({
    include: [
      {
        model: Type,
      },
      {
        model: ImageBeer,
      },
      {
        model: Comment,
      },
      {
        model: Brewery,
      },
    ],
  });

exports.findBeer = (typeBeerId) =>
  Beer.findAll({
    where: {
      typeId: typeBeerId,
    },
    include: [
      {
        model: Type,
      },
      {
        model: ImageBeer,
      },
    ],
  });

exports.addBeer = (beer) => Beer.create(beer);

exports.dataBeer = (beerId) =>
  Beer.findByPk(beerId, {
    include: [
      {
        model: Type,
      },
      {
        model: ImageBeer,
      },
      {
        model: Comment,
      },
      {
        model: Brewery,
      },
    ],
  });

exports.addCommentBeer = async (message, beerId, userId) => {
  return await Comment.create({ message, beerId, userId });
};

exports.updateCommentBeer = (updatedComment, commentId) =>
  Comment.update(updatedComment, { where: { id: commentId } });

exports.findCommentById = (commentId) =>
  Comment.findOne({
    where: {
      id: commentId,
    },
  });

exports.deleteCommentBeer = (commentId) =>
  Comment.destroy({
    where: {
      id: commentId,
    },
  });

exports.createImageBeer = (createValue) => ImageBeer.create(createValue);

exports.getCommentBeer = (beerId) =>
  Comment.findAll({
    where: { beerId: beerId },
    include: [{ model: User }],
  });

exports.getComment = (beerId, commentId) => {
  Comment.findOne({
    where: {
      id: commentId,
      beerId: beerId,
    },
  });
};

exports.deleteBeerById = (beerId) => Beer.destroy({ where: { id: beerId } });
