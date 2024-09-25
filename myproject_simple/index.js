const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');  // Import cors
const path = require('path');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs'); 

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
            surename TEXT
        )`);
    }
}); 

// ----------------------------------------------------------------

app.post('/submitmembership', (req, res) => {
    postData(req, res);
    // res.send('User saved');
});

const postData = (req, res) => {
    // req (short for "request") is used to access the data sent by the client
    // res (short for "response") is used to send a response back to the client.
    const { firstname, surename } = req.body;

    console.log(firstname)

    if (!firstname || !surename) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const sql = 'INSERT INTO users (firstname, surename) VALUES (?, ?)'; 
    // the line of code you provided only defines the SQL query as a string. It does not actually execute the query. 

    db.run(sql, [firstname, surename], function (err) {
    // db.run(sql, [firstname, surename], function (err) { ... }): Executes the SQL query with the provided values
    // function (err) {...} is a callback function. 
        if (err) {
            return res.status(400).json({ error: err.message });
        } else {
            console.log("Rendering thankyou.ejs");  
            console.log(firstname, surename);
            // redirect to the thankyou page with the encoded firstname and surename parameters. 
            res.redirect(`/thankyou?firstname=${encodeURIComponent(firstname)}&surename=${encodeURIComponent(surename)}`);
        }

    });
}

// ------------------------------------------------------------------------------------------------

app.get('/thankyou', (req, res) => {
    // Get the form data from query parameters
    const { id, firstname, surename } = req.query;
    res.render('thankyou', { title: 'Thank You', id, firstname, surename});
});


//--------------------------------------------------------------------------------------------------


app.get('/membershipdetails', (req, res) => {
    getData(res);
    // res.send('Data fetched and logged to console');
});

// Function to fetch data from the 'users' table
const getData = (res) => {
    const sql = `SELECT id, firstname, surename FROM users`; // Query for firstname and surname from 'users' table

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }

        // Log data to console (optional, for debugging)
        rows.forEach((row) => {
            console.log(`ID: ${row.id}, Firstname: ${row.firstname}, Surname: ${row.surename}`);
        });

        // Render the 'submit' view after fetching data
        res.render('submit', { title: 'Thank You', rows: rows });
    });
};

app.listen(4000);
console.log('Server is listening on port 4000');