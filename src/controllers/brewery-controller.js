const fs = require("fs");
const breweryService = require("../services/brewery-service");
const uploadService = require("../services/upload-service");

exports.addBrewery = async (req, res, next) => {
  try {
    const brew = req.body;
    // console.log(brew)
    const rs = await breweryService.addBrewery(brew);
    res.status(200).json(rs);
  } catch (err) {
    next(err);
  }
};

exports.dataBrewery = async (req, res, next) => {
  try {
    const { breweryId } = req.params;
    const rs = await breweryService.dataBrewery(breweryId);
    res.status(200).json(rs);
  } catch (err) {
    next(err);
  }
};

exports.findBrewery = async (req, res, next) => {
  try {
    const { name } = req.query;
    // console.log(name);
    const rs = await breweryService.findBrewery(name);
    res.status(200).json(rs);
  } catch (err) {
    console.log("I can't found");
    next(err);
  }
};


exports.uploadImage = async (req, res, next) => {
  try {
    const createValue = {};
    createValue.image = await uploadService.upload(req.files.image[0].path);
    createValue.logo = await uploadService.upload(req.files.logo[0].path);
    const rs = await user.create(createValue);
    res.status(200).json(rs);
  } catch (err) {
    next(err);
  } finally {
    if (req.files.image) {
      fs.unlinkSync(req.files.image[0].path);
    }
    if (req.files.logo) {
      fs.unlinkSync(req.files.logo[0].path);
    }
  }
};