// Require the express web application framework (https://expressjs.com)
const express = require('express')
const path = require('path'); 

// Additional package for logging of HTTP requests/responses
const morgan = require('morgan');

// Create a new web application by calling the express function
const app = express()
const port = 3000

// Include the logging for all requests
app.use(morgan('common'));

// Tell our application to serve all the files under the `public_html` directory
app.use(express.static('public_html'))

// Tell our application to listen to requests at port 3000 on the localhost
app.listen(port, ()=> {
  // When the application starts, print to the console that our app is
  // running at http://localhost:3000. Print another message indicating
  // how to shut the server down.
  console.log(`Web server running at: http://localhost:${port}`)
  console.log(`Type Ctrl+C to shut down the web server`)
})


app.use(express.static(path.join(__dirname, 'public')));
// when a client visits http://localhost:3000/, Express will automatically serve the index.html file from the public directory (if it exists).

app.get('/foreerror', (req, res) => {
  try {
    console.log('Got a request to force an error ...');
    let f;
    console.log(`f=${f.nomethod()}`);  // This will throw a TypeError
  } catch (error) {
    console.error('An error occurred:', error.message);  // Log the error
    res.status(500).send("500: TypeError: Cannot read properties of undefined (reading 'nomethod')");  // Send a 500 response to the client
  }
});


app.get('/foreerror', (req, res) => {
  try {
    console.log('Got a request to force an error ...');
    let f; // empty variable
    // will cause an error as f does not have a method called nomethod
    // leaving f undefined and then attempting to call a method on it.
    console.log(`f=${f.nomethod()}`);  // This will throw a TypeError
  } catch (error) {
    console.error('An error occurred:', error.message);  // Log the error
    res.status(500).send("500: TypeError: Cannot read properties of undefined (reading 'nomethod')");  // Send a 500 response to the client
  }
});

//create error handler
// localhost:3000/doenotexist
// 404: File not found

app.get('/doenotexist', (req, res) => {
  console.log('File not found');
  res.status(404).send('File not found');
})