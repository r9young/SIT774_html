var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');


// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
    res.render('index', { title: 'Home Page'});
  // res.rend() will look in a `views` folder for the view.
  // Express is automatically looking in the views folder for the corresponding EJS files. By default, Express expects to find the views (EJS files) inside a directory named views.

});


app.post('/submitmembership', function(req, res) {
    const firstname = req.body.firstname; // Extract firstname from the POST request
    const surename = req.body.surename;   // Extract surename from the POST request
    const email = req.body.email; 
    const mobileNumber = req.body.mobileNumber;    
    const inputNumCaps = req.body.inputNumCaps

    const array = [];

    array.forEach(element => {
        if (element.toLowerCase() === firstname.toLowerCase() || element.toLowerCase() === surename.toLowerCase()) {
            return res.render('thankyou', { title: 'error', firstname: 'First name or Surename already exists!', surename: 'First name or Surename already exists!' });
        }   
    });

    // if (!firstname || !surename || !email || !mobileNumber || !inputNumCaps) {
    //     // If any required field is missing, render the thank you page with an error message
    //     return res.render('thankyou', { title: 'error', firstname: 'First name is required!', surename: 'First name is required!' });
    // } else {
    //     // If all required fields are present, render the thank you page with the submitted data
    //     return res.render('thankyou', { title: 'Thank You', firstname: firstname, surename: surename, email: email, mobileNumber: mobileNumber, inputNumCaps: inputNumCaps });
    // }
    
});



app.listen(8000);
console.log('Server is listening on port 8000');