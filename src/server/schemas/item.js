var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Types = Schema.Types;

module.exports = new Schema({
  artist: String,
  album: String,
  title: String,
  tags: [{ type: Types.ObjectId, ref: 'Tag' }]
});
