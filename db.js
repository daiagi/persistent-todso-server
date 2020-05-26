/* eslint-disable no-shadow */

const Mongoose = require('mongoose');


const uri = `mongodb+srv://${process.env.DB_USER}:${encodeURI(process.env.DB_PWD)}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const connectToDatabase = () => {
  let isConnected;
  // eslint-disable-next-line consistent-return
  return async () => {
    if (isConnected) {
      console.log('using existing database connection');
      return Promise.resolve();
    }

    console.log('using new database connection');
    const database = await Mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = database.connections[0].readyState;
  };

  // return isConnected;
};


module.exports = connectToDatabase;


// module.exports = () => Mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Successfully connect to MongoDB.');
//   initial();
// })
//   .catch((err) => {
//     console.error('Connection error', err);
//     process.exit();
//   });
