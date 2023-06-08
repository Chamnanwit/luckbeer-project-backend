const { User } = require("../models");

exports.checkUserByEmail = (emailInput) =>
  User.findOne({
    where: {
      email: emailInput,
    },
  });

exports.getUserByEmail = (emailInput) =>
  User.findOne({
    where: {
      email: emailInput,
    },
  });

exports.createUser = (user) => User.create(user);

exports.getUserById = (id) => User.findByPk(id);
