
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');

const User = db.user;
const Role = db.role;

exports.signup = async (req, res) => {
  const requestBody = req.body;
  const user = new User({
    username: requestBody.username,
    email: requestBody.email,
    password: bcrypt.hashSync(requestBody.password),
  });
  await user.save().catch((e) => res.status(500).send({ message: e }));

  if (requestBody.roles) {
    await Role.find({
      name: { $in: requestBody.roles },
    })
      .catch((e) => res.status(500).send({ message: e }))
      .then((roles) => {
        user.roles = roles.map((role) => role._id);
        user.save()
          .then(() => res.status(200).send({ message: 'User was registered successfully!' }))
          .catch((e) => res.status(500).send({ message: e }));
      });
  } else {
    await Role.find({
      name: 'user',
    }).exec()
      .catch((e) => res.status(500).send({ message: e }))
      .then((roles) => {
        user.roles = roles.map((role) => role._id);
        user.save()
          .then(() => res.status(200).send({ message: 'User was registered successfully!' }))
          .catch((e) => res.status(500).send({ message: e }));
      });
  }
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  }).populate('roles', '-__v')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        res.status(404).send({ message: 'User not found' });
        return;
      }
      const passwordIsValied = bcrypt.compareSync(
        req.body.password,
        user.password,
      );
      if (!passwordIsValied) {
        res.status(401).send({

          accessToken: null,
          message: 'Invalied Passowrd!',
        });
        return;
      }
      const token = jwt.sign({ id: user._id }, process.env.jwt_secret, {
        expiresIn: 86400, // 24 hours
      });

      const authorities = user.roles.map((role) => `ROLE_${role.name.toUpperCase()}`);
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });
};
