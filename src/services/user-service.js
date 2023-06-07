const { User } = require("../models");

exports.checkUserByEmail = (emailInput) =>
  User.findOne({
    where: {
      email: emailInput,
    },
  });

exports.createUser = (user) => User.create(user);
