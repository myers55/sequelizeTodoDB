const express = require('express');
// const mustache = require('mustache');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const models = require("./models");
var server = express();

server.engine('mustache', mustacheExpress());
server.set('views', './views');
server.set('view engine', 'mustache');
server.use(express.static('public'));
server.use(bodyParser.urlencoded());
server.use(expressValidator());

// var todos = [];

server.get('/', (request, response) => {
    // response.render('todoList', { todos });
    models.todo.findAll().then(function (todos) {
        //   console.log(todos);
        response.render('todoList', { todos });
    });

});
server.post('/', (request, response) => {
    var todo = new models.todo();
    todo.name = request.body.name;
    todo.completed = false;
    todo.save().then(() => {
        response.redirect('/');
    });
    // models.todo.id = models.todo.length;
    // todos.push(todo);
    // response.render('todoList', { todos });
    // // console.log('listItem', listItem);
});
server.post('/:id', (request, response) => {
    var todoId = request.params.id;
    models.todo.findOne({
        where: {
            id: todoId
        }
    }).then(function (todo) {
        //Code here
        todo.completed = true;
        todo.save();
        response.redirect('/');
    });;
});
server.post('/:id/delete', async (request, response) => {
    await models.todo.destroy({ where: {id: request.params.id}});
     response.redirect('/');
});

server.listen(3000, function () {
    console.log('im working');
});