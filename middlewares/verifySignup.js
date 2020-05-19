const db = require('../models');

const { ROLES } = db;
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Username

  try {
    const userWithSameUserName = await User.findOne({
      username: req.body.username,
    }).exec();

    if (userWithSameUserName) {
      res.status(400).send({ message: 'Failed! Username is already in use!' });
      return;
    }
    const userWithSameMail = await User.findOne({
      email: req.body.email,
    }).exec();
    if (userWithSameMail) {
      res.status(400).send({ message: 'Failed! Email is already in use!' });
      return;
    }
    next();
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
