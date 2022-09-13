"use strict";

// required packages
var express = require('express');

var layout = require('express-ejs-layouts');

var methodOverride = require("method-override"); // express app config


var app = express();
var PORT = 3001;
app.set('view engine', 'ejs'); // middlewares section

app.use(layout); // tell express to listen for request bodies sent from HTML forms

app.use(express.urlencoded({
  extended: false
}));
app.use(methodOverride("_method"));
app.use(function (req, res, next) {
  console.log('hello I am the world\'s smallest middleware 👋'); // invoke to tell express to continue with the other middlewars

  next();
}); // static files
// to use CSS in your express projects, you must serve them up in a designated static folder. This folder is usually on the root directory and is called 'public'.
// first we create a 'public' folder from which we can serve static files such as CSS.

app.use(express["static"]('public')); // we then configure our app to be able to read any CSS files that we serve inside of the new public folder.
// app.use('/css', express.static(path.join(rootDir, 'node_modules', 'bootstrap', 'dist', 'css')))
// route definitions

app.get('/', function (req, res) {
  res.render('home.ejs');
}); // controllers

app.use('/dinosaurs', require('./controllers/dinoController'));
app.use('/prehistoric_creatures', require('./controllers/prehistoricCreaturesController')); // listen on a port

app.listen(PORT, function () {
  return console.log("is that dinos i hear on port ".concat(PORT, " \uD83E\uDD95"));
});