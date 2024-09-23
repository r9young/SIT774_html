Purpose of this project is to make the code simpler to test the node.js and database connections

npm install express sqlite3 cors ejs


Bug: 

    {
        "message": "Missing required fields"
    }

Fixed:


app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'script.js'));
});


and 


const response = await fetch('http://localhost:4000/saveUser', {

}