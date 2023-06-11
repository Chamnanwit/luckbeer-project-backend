const { Beer, Type, Comment, Like } = require("../models");

exports.findBeer = (typeBeerId) =>
  Beer.findAll({
    where: {
      typeId: typeBeerId,
    },
    include: [
      {
        model: Type,
      },
    ],
  });

exports.addBeer = (beer) => Beer.create(beer);

exports.dataBeer = (beerId) =>
  Beer.findOne({
    where: {
      id: beerId,
    },
  });

exports.addCommentBeer = (comment) => Comment.create(comment);

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
