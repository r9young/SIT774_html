// Require the express web application framework (https://expressjs.com)
const express = require('express');
const morgan = require('morgan');

const app = express ();
const port = 3000;

// Have the logging code
app. use (morgan (' common'));




// Tell our application to serve all the files under the 'public_html directory app use(express.static('public_html'))
// < ADD GLOABL VARIABLES HERE >>
// ....

app. get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
    // __dirname is a global variable in Node.js that represents the directory name of the current module (the file that is being executed).
})

// Route to handle the 'like' action
app.post('/like-grey', (req, res) => {
    console.log("User liked 'Grey'!");
    res.send("You liked 'Grey'!");
});

  
// < ADD CODE HERE >>
// The handler for a GET request on route '/likeyellow' and return a dynamic page (fragment)
// ...

// < ADD CODE HERE >>
// The handler for a GET request on route '/likegrey' and return a dynamic page (fragment)
// ...

// The last route handler can be used to return your own error messages
// it is expecting an 'Error' object as the first parameter, which is generated
// internally from Express when an error is detected.


app.use( (error, request, response, next) => {
    // we may use properties of the error object
    // here and next(err) appropriately, or if
    // we possibly recovered from the error, simply next().
    let errorStatus = error.status || 500;
    response.status(errorStatus);
    response.send(`<h3>${errorStatus}: ${error.toString()}</h3>`);
});


app.listen(port, ()=> {
    // Tell our application to listen to requests at port 3000 on the localhost app. listen (port, (→ {
    // When the application starts, print to the console that our app is
    // running at http://localhost:3000. Print another message indicating
    // how to shut the server down.

    console.log(`Web server running at: http://localhost:${port}`)
    console.log(`Type Ctrl+C to shut down the web server`)
})