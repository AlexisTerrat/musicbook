var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Tag', tagSchema);
