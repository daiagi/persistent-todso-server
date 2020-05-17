/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const db = require('../models');

const User = db.user;
const RoleModel = db.role;

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }


  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};


const isRole = (Role) => (req, res, next) => {
  User.findById(req, res.request.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    RoleModel.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === Role) {
            next();
            return;
          }
        }

        res.status(403).send({ message: `Require ${Role} Role!` });
      },
    );
  });
};

const isAdmin = isRole('admin');

const isModerator = isRole('moderator');

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};
module.exports = authJwt;
