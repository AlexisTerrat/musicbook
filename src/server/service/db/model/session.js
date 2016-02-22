var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Types = Schema.Types;

var sessionSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  token: String,
  expire: Number
});

module.exports = mongoose.model('Session', sessionSchema);
