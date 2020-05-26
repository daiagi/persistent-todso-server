
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const todosRoutes = require('./todos.routes');

module.exports = function routes(app) {


  authRoutes(app);
  todosRoutes(app);
};
