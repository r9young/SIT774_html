const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');  // Import cors
const app = express();
const port = 4000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

app.set('view engine', 'ejs'); // or 'pug', 'hbs' depending on the engine you're using


app.get('/', function(req, res) {
    res.render('index', { title: 'Home Page'});
  // res.rend() will look in a `views` folder for the view.
  // Express is automatically looking in the views folder for the corresponding EJS files. By default, Express expects to find the views (EJS files) inside a directory named views.

});

// Connect to SQLite database
const db = new sqlite3.Database('./database.sqlite', (err) => {
    // Both ./database.sqlite and database.sqlite refer to the same file location, which is the current working directory of the script execution.
    // (error) => {} this is a callback function 
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            firstname TEXT, 
            surename TEXT
        )`);
    }
     // id INTEGER PRIMARY KEY AUTOINCREMENT
        // email TEXT, 
        // mobile TEXT, 
        // capstyle TEXT, 
        // inputNumCaps TEXT, 
        // comments TEXT
    }); 

app.post('/saveUser', (req, res) => {
    // const { firstname, surename, email, mobile, inputNumCaps, capstyle, comments  } = req.body;

    const { firstname, surename } = req.body;
    // const { name, email } = req.body; is same as below. They are the same in term of functionality.
    // const name = req.body.name;
    // const email = req.body.email;

    // const sql = 'INSERT INTO users (firstname, surename, email, mobile, inputNumCaps, capstyle, comments ) VALUES (?, ?, ?, ?, ?, ?, ?)';

    //debug
    if (!firstname || !surename) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // const sql = 'INSERT INTO users (firstname, surename) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const sql = 'INSERT INTO users (firstname, surename) VALUES (?, ?)';

    // users - table name
    // if without the placehoder (?), it will potentially cause SQL injection attacks.
    // e.g user input "John'; DROP TABLE users; --", the entire database would be dropped.



    // db.run(sql, [firstname, surename, email, mobile, inputNumCaps, capstyle, comments], function (err) {
    db.run(sql, [firstname, surename], function (err) {
    // db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function (err) {...};
    // INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com');
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ // send a json response to user
            message: 'User saved',
            userId: this.lastID
        });
    });
});

app.listen(4000);
console.log('Server is listening on port 4000');




// How to check table? 
// sqlite3 database.sqlite 
//PRAGMA table_info(users);

