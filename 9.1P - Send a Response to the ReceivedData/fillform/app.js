const express = require('express');
const app = express();
const port = 3000;

// Middleware to handle form data
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Route to render the form (Page A)
app.get('/form', (req, res) => {
  res.render('form');
});

// Route to handle form submission and render filled form (Page B)
app.post('/fillForm', (req, res) => {
// (req, res) => { is a function
// sets up a route that listens for POST requests 
  const name = req.body.name;
  res.render('fillForm', { name });
});

// Start the server
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});