const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');  // Import cors
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs'); 



app.get('/', function(req, res) {
    res.render('index', { title: 'Home Page'});
});

// Connect to SQLite database
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

app.post('/saveUser', (req, res) => {

    const { firstname, surename } = req.body;

    if (!firstname || !surename) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const sql = 'INSERT INTO users (firstname, surename) VALUES (?, ?)';
    db.run(sql, [firstname, surename], function (err) {
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

