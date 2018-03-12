const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var newsSchema = new Schema({
  title: String,
  url: String,
  description: String,
  date: Date,
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

mongoose.model('news', newsSchema);
