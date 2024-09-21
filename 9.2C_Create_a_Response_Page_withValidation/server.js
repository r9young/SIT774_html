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
    const mobile = req.body.mobileNumber;    
    const numcaps = req.body.inputNumCaps
    const capstyle = req.body.capstyles
    const comments = req.body.comments

    console.log(capstyle);
    
    
    // check if all fields are filled
    const array = [firstname, surename, email, mobile, numcaps, capstyle, comments];

    // console.log(array);
    // console.log (array)

    let count = 0;
    array.forEach((element) => {
        if (element == "" || element == null) {
            // count increase 1;
            count++;
        }
    });

    // console.log(count)

    //bug: capstyle is not correctly getting checked. It should be 'uppercase' or 'lowercase'

    if (!firstname || !surename || !email || !  mobile  || !numcaps || !capstyle  || !comments  ) {
        res.render('alert', { title: 'Thank You', firstname, surename,email,mobile,numcaps,capstyle,comments, count});
    } else {
        res.render('thankyou', { title: 'Thank You', firstname, surename,email,mobile,numcaps,capstyle,comments}); // Pass firstname
    }
    
});


app.listen(3000);
console.log('Server is listening on port 3000');