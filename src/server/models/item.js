var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Types = Schema.Types;

var itemSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  artist: String,
  album: String,
  title: String,
  links: [String],
  tags: [{ type: Types.ObjectId, ref: 'Tag' }]
});

module.exports = mongoose.model('Item', itemSchema);
