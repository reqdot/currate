const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bulletinSchema = new Schema({
  title: String,
  content: String,
  date: Date,
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

mongoose.model('bulletins', bulletinSchema);
