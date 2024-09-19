var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');


// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
    res.render('pages/index', { title: 'Home Page', firstname: '' });
  // res.rend() will look in a `views` folder for the view.
  // Express is automatically looking in the views folder for the corresponding EJS files. By default, Express expects to find the views (EJS files) inside a directory named views.

});


app.post('/submitmembership', function(req, res) {
    const firstname = req.body.firstname; // Extract firstname from the POST request
    res.render('pages/thankyou', { firstname: firstname }); // Pass firstname to the thankyou page
});


app.listen(8000);
console.log('Server is listening on port 8000');