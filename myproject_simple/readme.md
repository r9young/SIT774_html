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


result: your server and database are working correctly



--------------------------------


debug:

script.js:22 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'json')
    at HTMLFormElement.<anonymous> (script.js:22:35)
(anonymous) @ script.js:22Understand this error
content.js:2 Error: <svg> attribute viewBox: Expected number, "0 0 100% 4".

error message in console: 

```javascript

document.getElementById('postMembershipForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form data
    const firstname = document.getElementById('inputFirstname').value;
    const surename = document.getElementById('inputSurname').value;

    if (!firstname || !surename) {
        alert('Please fill in all required fields.');
        return;// Stops the execution of the code, so the fetch request won't run
    }

    const response = await fetch('http://localhost:4000/saveUser', {
        method: 'POST', // send data to the server
        headers: { 'Content-Type': 'application/json' }, // tell server that the request body contains JSON data. 
        body: JSON.stringify({ firstname, surename}) //convert two values into a JSON  string
    })
    .then(response => response.json())
    .then(data => console.log(data)) // Handle server response
    .catch(error => console.error('Error:', error));

    // const result = await response.json();
    // console.log(result); // Use the parsed JSON data

});

```