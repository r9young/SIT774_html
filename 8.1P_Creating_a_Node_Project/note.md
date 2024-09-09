`nodemon`

The purpose of using nodemon is to automatically restart your Node.js application when it detects changes in the source files.


http://localhost:3000/

const path = require('path'); 

app.use(express.static(path.join(__dirname, 'public')));
// when a client visits http://localhost:3000/, Express will automatically serve the index.html file from the public directory (if it exists).
