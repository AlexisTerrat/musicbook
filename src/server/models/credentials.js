var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Types = Schema.Types;

var credentialsSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  hash: String,
  salt: String
});

module.exports = mongoose.model('Credentials', credentialsSchema);
