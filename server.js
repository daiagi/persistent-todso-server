require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const connectToAtlasDb = require('./db');
const routes = require('./routes');

const app = express();
const dbConnection = connectToAtlasDb();


// MiddleWares
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, Accept',
  );
  next();
});


// Routes

// app.use(express.static('../client/build/'));

app.use((req, res, next) => {
  dbConnection().then(next);
});
app.get('/home')

routes(app);


// Listen

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

// db connection
// connectToAtlasDb();

const appHandler = serverless(app);
module.exports.handler = async (event, context) => {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;
  return appHandler(event, context);
};
