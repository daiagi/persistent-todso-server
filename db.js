/* eslint-disable no-shadow */
const Mongoose = require('mongoose');

const {
  user, password, cluster, dbName,
} = require('./config/config.dev.js').database;


const db = require('./models');


const uri = `mongodb+srv://${user}:${encodeURI(password)}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

console.log(uri);
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


module.exports = () => Mongoose.connect(uri, {
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
