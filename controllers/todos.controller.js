
const db = require('../models');

const User = db.user;
const Todo = db.todo;


const getTodos = (req, res) => {
  User.findById(req.userId).populate('todos').exec()
    .catch((err) => res.status(500).send({ message: err }))
    .then((user) => res.status(200).send(user.todos));
};
const getTodoById = (req, res) => {
  Todo.findById(req.params.todoId, '-__v -user').exec()
    .catch((err) => res.status(500).send({ message: err }))
    .then((todo) => {
      if (todo) {
        res.status(200).send(todo);
        return;
      }
      res.status(404).send({ message: 'Todo not Found' });
    });
};

const addTodo = async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    content: req.body.content,
    updated: Date.now(),
    user: req.userId,
  });


  todo.save()
    .catch((e) => res.status(500).send({ message: e }))
    .then((newTodo) => {
      User.findByIdAndUpdate(req.userId, {
        $push: {
          todos: newTodo._id,
        },
      }).exec()
        .catch((e) => res.status(500).send({ message: e }))
        .then(() => res.status(201).send({ todoId: newTodo._id }));
    });
};

const updateTodo = (req, res) => {
  const { todoId } = req.params;

  Todo.findByIdAndUpdate(todoId, {
    ...req.body,
    updated: Date.now(),

  }, { new: true }).exec()
    .catch((e) => res.status(500).send({ message: e }))
    .then((todo) => {
      if (todo) {
        res.status(200).send(todo);
        return;
      }
      res.status(404).send({ message: 'Todo not Found' });
    });
};
const deleteTodo = (req, res) => {
  Todo.deleteOne({ _id: req.params.todoId }).exec()
    .catch((e) => res.status(500).send({ message: e }))
    .then(() => res.status(200).send({ message: 'todo removed' }));
};


module.exports = {
  getTodos,
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodo,
};
