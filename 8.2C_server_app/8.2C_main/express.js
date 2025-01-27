// Require the express web application framework (https://expressjs.com)
const express = require('express');
const morgan = require('morgan');

const app = express ();
const port = 3000;

let grey_count=0;
let yellow_count=0;




const requestTime = function (req, res, next) {
    req.requestTime = Date.now()
    next()
}



// Tell our application to serve all the files under the 'public_html directory app use(express.static('public_html'))
// < ADD GLOABL VARIABLES HERE >>
// ....

app.use(express.static('public_html')); 
// the purpose of app.use(express.static('public_html'));  is to tell Expresss: Look in the public_html folder whenever a file request comes in

// otherwise: 404: Error: ENOENT: no such file or directory, stat '/Users/r9young/Library/Mobile Documents/com~apple~CloudDocs/Coding/html - SIT774/8.2C_server_app/8.2C_mainpublic_html/index.html'





app. get('/', (req, res) => {
    res.sendFile(__dirname + "public_html/index.html")
    // __dirname is a global variable in Node.js that represents the directory name of the current module (the file that is being executed).
})



// < ADD CODE HERE >>
// The handler for a GET request on route '/likegrey' and return a dynamic page (fragment)
// ...
// Route to handle the 'likegrey' action

app.post('/likegrey',requestTime, (req, res) => {
    // Log request body (optional)
    // console.log(req.body);
    // console.log(`Request time: ${new Date(req.requestTime).toLocaleString()}`);
    grey_count++;
    let total_count = grey_count + yellow_count;



    const d = new Date();
    res.send(`
        <html>
        <body>
            <h1>Thank you for your GREY vote!</h1>
            <p><b>Vote submitted at: ${d}</b></p>
            <p><b>Vote submitted for the Grey Cap at: ${d}</b></p>
            <p>That's another vote for the likeable grey cap.</p>
            <p>There are a total of ${total_count} counted [YELLOW LIKES: ${yellow_count} and GREY LIKES: ${grey_count}] </p>
            <p>Grey cap votes: ${grey_count}</p>
            <p>Please call again soon!</p>
            <a href="/">Click here to return to the main page</a>
        </body>
        </html>
    `);
});




// < ADD CODE HERE >>
// The handler for a GET request on route '/likeyellow' and return a dynamic page (fragment)
// ...
// Route to handle the 'likeyellow' action
app.post('/likeyellow', (req, res) => {
    // console.log(req.body);
    yellow_count++;
    let total_count = grey_count + yellow_count;

    const d = new Date();
    res.send(`
      <html>
        <body>
            <h1>Thank you for your GREY vote!</h1>
            <p><b>Vote submitted at: ${d}</b></p>
            <p><b>Vote submitted for the Yellow Cap at: ${d}</b></p>
            <p>That's another vote for the likeable grey cap.</p>
            <p>There are a total of ${total_count} counted [YELLOW LIKES: ${yellow_count} and GREY LIKES: ${grey_count}] </p>
            <p>Please call again soon!</p>
            <a href="/">Click here to return to the main page</a>
        </body>
      </html>
    `);
  });

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