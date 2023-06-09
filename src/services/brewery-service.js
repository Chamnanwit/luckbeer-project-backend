const { Brewery } = require("../models");

exports.addBrewery = (brew) => Brewery.create(brew);
