/* eslint-disable no-shadow */
const Mongoose = require('mongoose');
const {
  user, password, cluster, database,
} = require('./config/db.config');
const db = require('./models');

const Role = db.role;

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user',
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: 'moderator',
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: 'admin',
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}


const uri = `mongodb+srv://${user}:${encodeURI(password)}@${cluster}.mongodb.net/${database}?retryWrites=true&w=majority`;
const DBConnection = Mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Successfully connect to MongoDB.');
  initial();
})
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });
