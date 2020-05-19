const mongoose = require('mongoose');

const Todo = mongoose.model(
  'Todo',
  new mongoose.Schema({
    title: String,
    content: String,
    updated: Date,
    done: {
      type: Boolean,
      default: false,
    },
    user:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      immutable: true,

    },

  }),
);

module.exports = Todo;
