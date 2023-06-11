const fs = require("fs");
const beerService = require("../services/beer-service");
const likeService = require("../services/like-service");
const uploadService = require("../services/upload-service");
const createError = require("../utils/create-error");

exports.findBeer = async (req, res, next) => {
  try {
    const { type } = req.query;
    console.log(type);
    const rs = await beerService.findBeer(type);
    res.status(200).json(rs);
  } catch (err) {
    next(err);
  }
};

exports.addBeer = async (req, res, next) => {
  try {
    const beer = req.body;
    // console.log(beer);
    const rs = await beerService.addBeer(beer);
    res.status(200).json(rs);
  } catch (err) {
    next(err);
  }
};

exports.dataBeer = async (req, res, next) => {
  try {
    const { beerId } = req.params;
    const rs = await beerService.dataBeer(beerId);
    res.status(200).json(rs);
  } catch (err) {
    next(err);
  }
};

exports.addCommentBeer = async (req, res, next) => {
  try {
    const comment = req.body;
    const rs = await beerService.addCommentBeer(comment);
    res.status(200).json(rs);
  } catch (err) {
    next(err);
  }
};

exports.updateCommentBeer = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    // console.log(commentId);
    const checkOwner = await beerService.findCommentById(commentId);
    if (checkOwner.userId !== req.user.id) {
      createError("This comment is not your", 401);
    }
    const updatedComment = req.body;
    const rs = await beerService.updateCommentBeer(updatedComment, commentId);
    res.status(200).json(rs);
  } catch (err) {
    next(err);
  }
};

exports.deleteCommentBeer = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const rs = await beerService.deleteCommentBeer(commentId);
    res.status(200).json(rs);
  } catch (err) {
    next(err);
  }
};

exports.deleteCommentBeerByUser = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const checkOwner = await beerService.findCommentById(commentId);
    console.log(checkOwner);
    if (checkOwner.userId !== req.user.id) {
      createError("This comment is not your", 401);
    }
    const rs = await beerService.deleteCommentBeer(commentId);
    res.status(200).json(rs);
  } catch (err) {
    next(err);
  }
};

exports.toggleLike = async (req, res, next) => {
  try {
    const { beerId } = req.params;
    const userId = req.user.id;
    const haveLike = await likeService.findLikeById(beerId, userId);
    console.log(haveLike);
    if (haveLike) {
      await likeService.unLike(beerId, userId);
    } else {
      await likeService.like();
    }
    res.status(201).json({ message: "Like success" });
  } catch (err) {
    next(err);
  }
};

exports.uploadImage = async (req, res, next) => {
  try {
    const createValue = {};
    createValue.image1 = await uploadService.upload(req.files.image1[0].path);
    createValue.image2 = await uploadService.upload(req.files.image2[0].path);
    createValue.image3 = await uploadService.upload(req.files.image3[0].path);
    createValue.image4 = await uploadService.upload(req.files.image4[0].path);
    const rs = await ImageBeer.create(createValue);
    res.status(200).json(rs);
  } catch (err) {
    next(err);
  } finally {
    if (req.files.image1) {
      fs.unlinkSync(req.files.image1[0].path);
    }
    if (req.files.image2) {
      fs.unlinkSync(req.files.image2[0].path);
    }
    if (req.files.image3) {
      fs.unlinkSync(req.files.image3[0].path);
    }
    if (req.files.image4) {
      fs.unlinkSync(req.files.image4[0].path);
    }
  }
};