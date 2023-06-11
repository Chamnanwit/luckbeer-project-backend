const { Op } = require('sequelize');
const { Brewery } = require("../models");

exports.addBrewery = (brew) => Brewery.create(brew);

exports.dataBrewery = (breweryId) =>
  Brewery.findOne({
    where: {
      id: breweryId,
    },
  });

  exports.findBrewery = (breweryName) =>
  Brewery.findAll({
    where: {
      name: {
        [Op.like]: `%${breweryName}%`,
      },
    },
  });
