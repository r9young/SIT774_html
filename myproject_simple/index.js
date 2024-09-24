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

    if (!firstname || !surename) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const sql = 'INSERT INTO users (firstname, surename) VALUES (?, ?)'; 
    // the line of code you provided only defines the SQL query as a string. It does not actually execute the query. 

    db.run(sql, [firstname, surename], function (err) {
    // db.run(sql, [firstname, surename], function (err) { ... }): Executes the SQL query with the provided values
    // function (err) {...} is a callback function. 
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ // send a json response to user
            message: 'User saved',
            userId: this.lastID
        });
    });
}

// ----------------------------------------------------------------


app.get('/feedback', (req, res) => {
    getData(res);
    // res.send('Data fetched and logged to console');
});

// Function to fetch data from the 'users' table
const getData = (res) => {
    const sql = `SELECT firstname, surename FROM users`; // Query for firstname and surname from 'users' table

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }

        // Loop through the rows and log the data
        rows.forEach((row) => {
           
            console.log(`Firstname: ${row.firstname}, Surname: ${row.surename}`);

            res.render('thankyou', { title: 'Thank You', rows: rows });

        });
    });
};


// Close the database connection when done
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Closed the database connection.');
// });

app.listen(4000);
console.log('Server is listening on port 4000');