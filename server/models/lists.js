var db = require('../../db/config')
var mongoose = require('mongoose');
var listSchema = mongoose.Schema({
  name: {type: String, required: true},
  task: {type: Array}
})

var List = mongoose.model('List', listSchema);

module.exports = List;