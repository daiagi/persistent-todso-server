
const { authJwt, verifyTodos } = require('../middlewares');
const {
  getTodos, getTodoById, addTodo, updateTodo, deleteTodo,
} = require('../controllers/todos.controller');


module.exports = function todosRoutes(app) {
  // READ
  app.get('/api/todos',
    authJwt.verifyToken,
    getTodos);

  app.get('/api/todos/:todoId',
    authJwt.verifyToken,
    verifyTodos.verifyOwnershipOfTodo,
    getTodoById);
  // CREATE
  app.post('/api/todos',
    authJwt.verifyToken,
    addTodo);
  app.post('/api/todos/:todoId',
    (req, res) => res.status(405).send({ message: 'Cannot POST to specific id. use PUT for updating ' }));

  // UPDATE
  app.put('/api/todos',
    (req, res) => res.status(405).send({ message: 'Cannot PUT without an id. use POST for creating a new Todo ' }));

  app.put('/api/todos/:todoId',
    [authJwt.verifyToken, verifyTodos.sanitizeUpdateRequest, verifyTodos.verifyOwnershipOfTodo],
    updateTodo);

  // DELETE
  app.delete('/api/todos',
    (req, res) => res.status(405).send({ message: 'Not allowed to delete collection! ' }));
  app.delete('/api/todos/:todoId',
    [authJwt.verifyToken, verifyTodos.verifyOwnershipOfTodo],
    deleteTodo);
};
