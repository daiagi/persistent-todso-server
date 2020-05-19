const db = require('../models');


const User = db.user;
const Todo = db.todo;
const forbbidenKeys = ['__v', '_id', 'user', 'updated'];


const verifyUserExists = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    if (user) {
      next();
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
const verifyOwnershipOfTodo = async (req, res, next) => {
  const todo = await Todo.findById(req.params.todoId).populate('user', '_id')
    .catch((err) => res.status(500).send({ message: err }));
  if (!todo) {
    res.status(404).send({ message: 'Todo not found!' });
    return;
  }
  if (todo.user.id !== req.userId) {
    res.status(401).send({ message: 'Unauthorized!' });
    return;
  }
  next();
};
const sanitizeUpdateRequest = async (req, res, next) => {
  const requestBody = { ...req.body };
  // remove keys that are in the schema but shuld not be touched by user
  for (let i = 0; i < forbbidenKeys.length; i++) {
    if (Reflect.has(requestBody, forbbidenKeys[i])) {
      delete requestBody[forbbidenKeys[i]];
    }
  }
  // keep only keys that are in the schema. i.e do not let rubbish keys pass on
  const updateQuery = Object.keys(Todo.schema.paths).reduce((updateQuery, schemaKey) => {
    if (requestBody[schemaKey]) {
      // eslint-disable-next-line no-param-reassign
      updateQuery = { ...updateQuery, [schemaKey]: requestBody[schemaKey] };
    }
    return updateQuery;
  }, {});
  req.body = updateQuery;

  next();
};


module.exports = {
  verifyUserExists,
  sanitizeUpdateRequest,
  verifyOwnershipOfTodo,
};
