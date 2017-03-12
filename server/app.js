var express = require('express');
var path = require('path');
var util = require('./lib/utility');
var handler = require('./lib/request-handler');

var partials = require('express-partials');
var bodyParser = require('body-parser');

var CookieParser = require('cookie-parser');
var SessionParser = require('express-session');

var app = express();
app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client')));
// app.use(CookieParser);
// app.use(SessionParser);
app.use(function(req, res, next) {
  console.log('method ', req.method, ' at ', req.url);
  next();
})

app.options('*', function (req, res) {
  console.log('options go here')
  res.writeHead(200, {
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Headers': 'content-type'
  });
  res.end();
});

app.get('/', function(req, res) {
  res.end();
})

app.get('/list/getLists', function(req, res) {
  //Pull all lists -> Eventually get all lists by a specific user
  handler.getLists(req, res);
});

app.post('/list/addTask', function(req, res) { //Expect to receive 
  //Add an element to our list array
  handler.addTask(req, res);
});

app.post('/list/removeTask', function(req, res) {
  handler.removeTask(req, res);
})

app.post('/list/addList', function(req, res) {
  console.log('it goes here', req.body);
  //Create a new object in our database
  handler.addList(req, res);
});

app.post('/list/removeList', function(req, res) {
  handler.removeList(req, res);
});

app.post('/list/getList', function(req, res) {
  handler.getList(req, res);
});
//
// app.options('/list/addTask', function(req, res) { //Expect to receive 
//   //Add an element to our list array
//   handler.addTask(req, res);
// });

// app.options('/list/removeTask', function(req, res) {
//   handler.removeTask(req, res);
// })

// app.options('/list/addList', function(req, res) {
//   console.log('OPTIONS it goes here', req.body);
//   //Create a new object in our database
//   handler.addList(req, res);
// });

// app.options('/list/removeList', function(req, res) {
//   handler.removeList(req, res);
// });

// app.options('/list/getList', function(req, res) {
//   handler.getList(req, res);
// });


module.exports = app;