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
