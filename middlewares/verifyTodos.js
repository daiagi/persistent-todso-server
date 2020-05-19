const db = require('../models');


const User = db.user;
const Todo = db.todo;


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
const verifyUpdateRequest = async (req, res, next) => {
  if (req.body.title && req.body.content) {
    next();
    return;
  }
  res.status(400).send({ message: 'request body missing title or content' });
};

module.exports = {
  verifyUserExists,
  verifyUpdateRequest,
  verifyOwnershipOfTodo,
};
