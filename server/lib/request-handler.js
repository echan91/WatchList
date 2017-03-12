var util = require('./utility');
var User = require('../models/users');
var List = require('../models/lists');
var db = require('../../db/config')

exports.getLists = function(req, res) {
  List.find().exec(function(err, docs) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.writeHead(200, {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      });
      res.end(JSON.stringify(docs));
    }
  })
}

exports.getList = function(req, res) {
  var name = req.body.name;
  List.find({name:name}).exec(function(err, doc) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.writeHead(200, {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      });
      res.end(JSON.stringify(doc));
    }
  });
}

exports.addList = function(req, res) {
  var name = req.body.name;
  console.log(name);
  List.findOne({name: name}).exec(function(err, found) {
    if (!found) {
      var newList = new List({
        name: name,
        task: []
      });
      newList.save(function(err, doc) {
        if (err) {
          res.status(500).send(err);
        }
        console.log('List saved!')
        res.writeHead(201, {
          'Access-Control-Allow-Origin' : '*'
        });
        res.end();
      })
    } else {
      console.log('List already exists!')
      res.writeHead(201, {
        'Access-Control-Allow-Origin' : '*'
      });
      res.end();
    }
  });
}

exports.removeList = function(req, res) {
  var name = req.body.name;
  List.remove({name: name}, function(err, result) {
    if (err) {
      console.log("Something wrong happened");
      res.status(500).send(err);
    } else {
      console.log('List deleted');
      res.writeHead(201, {
        'Access-Control-Allow-Origin' : '*'
      });
      res.end();
    }
  });
}

exports.addTask = function(req, res) {
  var name = req.body.name;
  var task = req.body.task;
  console.log('adding task:', name, task)
  List.findOneAndUpdate({name: name}, {$push: {task: task}}, function(err, doc) {
    console.log('it updated!');
    res.writeHead(201, {
      'Access-Control-Allow-Origin' : '*'
    });
    res.end(JSON.stringify(doc));
  });
}

exports.removeTask = function(req, res) {
  var name = req.body.name;
  var task = req.body.task;
  List.findOneAndUpdate({name:name}, {$pull: {task: task}}, function(err, doc) {
    console.log('it deleted!');
    res.writeHead(201, {
      'Access-Control-Allow-Origin' : '*'
    });
    res.end()
  });
}

