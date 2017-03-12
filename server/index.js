var app = require('./app.js');
// var db = require('../db');
var port = 3000;

app.listen(port, function() {
  console.log('Lists is listening on ' + port);
});