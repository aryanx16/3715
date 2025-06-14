const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  difficulty: String,
  link: String,
  dateSolved: Date,
});

module.exports = mongoose.model('Question', questionSchema);
