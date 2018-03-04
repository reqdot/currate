const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bulletinSchema = new Schema({
  title: String,
  content: String,
  date: Date,
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

mongoose.model('bulletins', bulletinSchema);
