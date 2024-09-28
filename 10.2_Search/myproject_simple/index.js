const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');  // Import cors
const path = require('path');
const app = express();
const port = 4050;

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
            mobile TEXT, 
            email TEXT, 
            capsOwned TEXT,
            capstyles TEXT,
            comments TEXT

        )`);
    }
}); 

// ----------------------------------------------------------------

app.post('/savedata', (req, res) => {
    postData(req, res);
    // res.send('User saved');
});

app.post('/submitmembership', function(req, res) {

    const { firstname, surename, mobileNumber, email, inputNumCaps, capstyles, comments  } = req.body;

    const array = [firstname, surename, mobileNumber, email, inputNumCaps, capstyles, comments];
    
    const sql = 'INSERT INTO users (firstname, surename, mobile, email, capsOwned,capstyles, comments) VALUES (?, ?, ?, ?, ?, ?,?)'; 

    let count = 0;
    array.forEach((element) => {
        if (!element) {
            count++;
        }
    });

 
    if (count > 0) {

        return res.render('alert', { title: 'Thank You', firstname, surename, mobileNumber, email, inputNumCaps, capstyles, comments, count});

    } else {
        
        res.render('thankyou', { title: 'Thank You', firstname, surename, mobileNumber, email, inputNumCaps, capstyles, comments}); // Pass firstname
        db.run(sql, [firstname, surename, mobileNumber, email, inputNumCaps, capstyles, comments], function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
        });
    }
});

//--------------------------------------------------------------------------------------------------

app.get('/feedback', (req, res) => {
    getData(res);
    // res.send('Data fetched and logged to console');
});

// Function to fetch data from the 'users' table
const getData = (res) => {
    const sql = `SELECT * FROM users`; // Query for firstname and surname from 'users' table

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('An error occurred while fetching the data.');
        }

        res.render('submit', { title: 'Thank You', rows: rows });
    });
};



// Function to search the database

app.get('/search', (req, res) => {
    const searchInput = req.query.searchInput; // get the search input from the query string
    const searchOption = req.query.searchOption; // get the search field (e.g., firstname, surname) from the query string

    // Ensure that only certain fields are allowed to be searched to avoid SQL injection
    const allowedFields = ['firstname', 'surname', 'mobile', 'email'];
    if (!allowedFields.includes(searchOption)) {
        return res.status(400).send('Invalid search option.');
    }

    // SQL statement to search the database
    const sql = `SELECT * FROM users WHERE ${searchOption} LIKE ?`;
    const searchValue = `%${searchInput}%`;

    db.all(sql, [searchValue], (err, rows) => {
        if (err) {
            res.status(500).send('An error occurred: ' + err.message);
        } else {
            res.render('submit', { title: 'Search Results', rows: rows });
        }
    });
});



app.listen(4050);
console.log('Server is listening on port 4050');






