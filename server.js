var express = require('express');
var app = express();
var server = require('http').createServer(app);
var config = require('./lib/config');
var connect = require('connect');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var path = require("path");
var async;



if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./todos');
}

app.use('/public', express.static('public'));

app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var json = (res, data) => {
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });

  if (typeof data === "string") res.write(data);

  else res.write(JSON.stringify(data));

  res.end();
};

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

app.get('/', (req, res) => {
      res.sendfile(__dirname + '/views/index.html');
    });

  app.get('/todos', (req, res) => {
    var todos = JSON.parse(localStorage.getItem("todos"));
    json(res, todos);
  });

  app.post('/todos/create', (req, res) => {
    var id = guid();
    var todos = JSON.parse(localStorage.getItem("todos")) || {};
    todos[id] = req.body.description;
    localStorage.setItem("todos", JSON.stringify(todos));
    json(res, { id: id });
  });

  app.post('/todos/update', (req, res) => {
    var id = req.body.id;
    var todos = JSON.parse(localStorage.getItem("todos")) || {};
    todos[id] = req.body.description;
    localStorage.setItem("todos", JSON.stringify(todos));
    json(res, {});
  });

  app.post('/todos/delete', (req, res) => {
    var id = req.body.id;
    var todos = JSON.parse(localStorage.getItem("todos")) || {};
    delete todos[id];
    localStorage.setItem("todos", JSON.stringify(todos));
    json(res, {});
  });

  server.listen(process.env.PORT || config.port);

  console.log(`Server Started at ${process.env.PORT || config.port}`)