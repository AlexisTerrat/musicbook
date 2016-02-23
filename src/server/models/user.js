var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Types = Schema.Types;

var userSchema = new Schema({
  email: String,
  tags: [{ type: Types.ObjectId, ref: 'Tag' }]
});

module.exports = mongoose.model('User', userSchema);
