const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');  // Import cors
const path = require('path');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs'); 

//???
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.render('index', { title: 'Home Page'});
});

// Route to serve the script.js file
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'script.js'));
});


// Connect to SQLite database && create a new database if it doesn't exist
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            firstname TEXT, 
            surename TEXT,
            moible TEXT, 
            email TEXT, 
            capsOwned TEXT,
            capstyles TEXT,
            comments TEXT

        )`);
    }
}); 

// ----------------------------------------------------------------

// app.post('/savedata', (req, res) => {
//     postData(req, res);
//     // res.send('User saved');
// });

// const postData = (req, res) => {
//     // req (short for "request") is used to access the data sent by the client
//     // res (short for "response") is used to send a response back to the client.
//     const { firstname, surename, mobile, email, capsOwned, capstyles, comments  } = req.body;

    


//     if (!firstname || !surename || !mobile || !email || !capsOwned || !capstyles || comments) {
//         return res.status(400).json({ message: 'Missing required fields' });
//     }

//     const sql = 'INSERT INTO users (firstname, surename, mobile,email, capsOwned, comments) VALUES (?, ?, ?, ?, ?, ?)'; 
//     // the line of code you provided only defines the SQL query as a string. It does not actually execute the query. 

//     db.run(sql, [firstname, surename, mobile, email, capsOwned, capstyles, comments], function (err) {
//         if (err) {
//             return res.status(400).json({ error: err.message });
//         } 

//     });
// }

// ------------------------------------------------------------------------------------------------
// Create the confirmation page

// app.get('/thankyou', (req, res) => {
//     // Get the form data from query parameters
//     const { id, firstname, surename, mobile, email, capsOwned, capstyles, comments } = req.query;
//     res.render('thankyou', { title: 'Thank You', id, firstname, surename, mobile, email, capsOwned, capstyles, comments});
// });


app.post('/submitmembership', function(req, res) {
    // const firstname = req.body.firstname; // Extract firstname from the POST request
    // const surename = req.body.surename;   // Extract surename from the POST request
    // const email = req.body.email; 
    // const mobile = req.body.mobileNumber;    
    // const numcaps = req.body.inputNumCaps
    // const capstyle = req.body.capstyles
    // const comments = req.body.comments


    // const { firstname, surename, email, mobileNumber:mobile, inputNumCaps:numcaps, capstyle, comments } = req.body;

    const { firstname, surename, mobileNumber, email, inputNumCaps, capstyles, comments  } = req.body;

    
    
    // check if all fields are filled
    const array = [firstname, surename, mobileNumber, email, inputNumCaps, capstyles, comments];

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

    if (!firstname || !surename || !email || !  mobileNumber  || !inputNumCaps || !capstyles  || !comments  ) {
        res.render('alert', { title: 'Thank You', firstname, surename, mobileNumber, email, inputNumCaps, capstyles, comments});
    } else {
        res.render('thankyou', { title: 'Thank You', firstname, surename, mobileNumber, email, inputNumCaps, capstyles, comments}); // Pass firstname
    }
    
});


//--------------------------------------------------------------------------------------------------


app.get('/membershipdetails', (req, res) => {
    getData(res);
    // res.send('Data fetched and logged to console');
});

// Function to fetch data from the 'users' table
const getData = (res) => {
    const sql = `SELECT id, firstname, surename, mobile, email, capsOwned, capstyles, comments FROM users`; // Query for firstname and surname from 'users' table

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }

        res.render('submit', { title: 'Thank You', rows: rows });
    });
};

app.listen(4000);
console.log('Server is listening on port 4000');