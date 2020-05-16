const mongoose = require('mongoose');

const Todo = mongoose.model(
  'Todo',
  new mongoose.Schema({
    title: String,
    text: String,
    updated: Date,
    user:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

  }),
);

module.exports = Todo;
