
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const todosRoutes = require('./todos.routes');

module.exports = function routes(app) {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });
  userRoutes(app);
  authRoutes(app);
  todosRoutes(app);
};
