const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);
