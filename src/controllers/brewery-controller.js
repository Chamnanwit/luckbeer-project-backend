const breweryService = require("../services/brewery-service");

exports.addBrewery = async (req, res, next) => {
  try {
    const brew = req.body;
    console.log(brew)
    const rs = await breweryService.addBrewery(brew);
    res.status(200).json(rs);
  } catch (err) {
    next(err);
  }
};
