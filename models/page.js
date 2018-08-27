var mongoose = require('mongoose');

var PageSchema = new mongoose.Schema({
  name: String,
  data: String,
  des: String
});

module.exports = mongoose.model('page', PageSchema);