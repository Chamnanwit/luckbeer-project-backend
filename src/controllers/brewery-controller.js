const fs = require("fs");
const breweryService = require("../services/brewery-service");
const uploadService = require("../services/upload-service");

exports.getAllBrewery = async (req, res, next) => {
  try {
    const rs = await breweryService.getAllBrewery();
    console.log(rs);
    res.status(200).json(rs);
  } catch (err) {
    next(err);
  }
};

exports.addBrewery = async (req, res, next) => {
  try {
    const brew = req.body;
    // console.log("----------------------------", brew)
    // console.log(brew)

    const uploadImage = await uploadService.upload(req.files.image[0].path);
    brew.image = uploadImage.secure_url;
    const uploadLogo = await uploadService.upload(req.files.logo[0].path);
    brew.logo = uploadLogo.secure_url;
    // const rs = await breweryService.create(createValue);
    const rs2 = await breweryService.addBrewery(brew);
    // res.status(200).json(rs);

    res.status(200).json(rs2);
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
    console.log(name);
    if (req.query == "") {
      const rs1 = await breweryService.getAllBrewery();
      console.log(rs1);
      res.status(200).json(rs1);
    } else 
    {const rs = await breweryService.findBrewery(name);
    res.status(200).json(rs);}
  } catch (err) {
    console.log("I can't found");
    next(err);
  }
};

exports.uploadImage = async (req, res, next) => {
  try {
    const createValue = {};
    const image = await uploadService.upload(req.files.image[0].path);
    createValue.image = image.secure_url;

    const logo = await uploadService.upload(req.files.logo[0].path);
    createValue.logo = logo.secure_url;

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
