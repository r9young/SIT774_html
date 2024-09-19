var express = require('express');
var path = require('path'); // Import the path module
var app = express();

// Set the directory for EJS views explicitly
app.set('views', path.join(__dirname, 'views'));  // This line ensures it looks in the right folder
app.set('view engine', 'ejs');  // Set EJS as the templating engine

// use res.render to load up an ejs view file

// index page

app.get('/', function(req, res) {
  res.render('pages/index');
  // res.rend() will look in a `views` folder for the view.
  // Express is automatically looking in the views folder for the corresponding EJS files. By default, Express expects to find the views (EJS files) inside a directory named views.

});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

app.listen(8080);
console.log('Server is listening on port 8080');